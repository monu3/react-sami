import { createCors } from "itty-cors";

const { preflight, corsify } = createCors({
  origins: ["*"],
  methods: ["GET", "POST", "DELETE", "OPTIONS"],
  headers: ["Content-Type", "Authorization"],
  credentials: true, // Required for cookie authentication
});

const MAX_UPLOAD_BYTES = 10 * 1024 * 1024; // 10MB, keep in sync with the frontend

// Simple Web Crypto JWT Generator/Verifier
async function signJWT(payload, secret) {
  const header = { alg: "HS256", typ: "JWT" };
  const enc = new TextEncoder();
  const base64Url = (str) =>
    btoa(str).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");

  const encodedHeader = base64Url(JSON.stringify(header));
  const encodedPayload = base64Url(JSON.stringify(payload));
  const tokenData = `${encodedHeader}.${encodedPayload}`;

  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );

  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    enc.encode(tokenData),
  );
  const encodedSignature = base64Url(
    String.fromCharCode(...new Uint8Array(signature)),
  );

  return `${tokenData}.${encodedSignature}`;
}

async function verifyJWT(token, secret) {
  try {
    const [header, payload, signature] = token.split(".");
    const enc = new TextEncoder();
    const tokenData = `${header}.${payload}`;

    const key = await crypto.subtle.importKey(
      "raw",
      enc.encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"],
    );

    const sigBuf = Uint8Array.from(
      atob(signature.replace(/-/g, "+").replace(/_/g, "/")),
      (c) => c.charCodeAt(0),
    );
    const valid = await crypto.subtle.verify(
      "HMAC",
      key,
      sigBuf,
      enc.encode(tokenData),
    );

    if (!valid) return null;
    return JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
  } catch {
    return null;
  }
}

// Helper to extract cookie
function getCookie(request, name) {
  const cookieHeader = request.headers.get("Cookie");
  if (!cookieHeader) return null;
  const cookies = Object.fromEntries(
    cookieHeader.split(";").map((c) => c.trim().split("=")),
  );
  return cookies[name] || null;
}

// Shared auth guard for protected endpoints
async function requireAuth(request, env) {
  const token = getCookie(request, "auth_token");
  const payload = token ? await verifyJWT(token, env.JWT_SECRET) : null;
  if (!payload || payload.exp < Date.now()) return null;
  return payload;
}

export default {
  async fetch(request, env, ctx) {
    if (request.method === "OPTIONS") return preflight(request);

    const url = new URL(request.url);

    // Login Endpoint
    if (url.pathname === "/api/login" && request.method === "POST") {
      return handleLogin(request, env);
    }

    // Check Auth Status
    if (url.pathname === "/api/auth/check" && request.method === "GET") {
      return handleAuthCheck(request, env);
    }

    // Gallery Endpoint (Public)
    if (url.pathname === "/api/gallery" && request.method === "GET") {
      return handleGalleryRequest(request, env);
    }

    if (url.pathname === "/api/folders" && request.method === "GET") {
      return handleGetFolders(request, env);
    }

    // Upload Endpoint (Protected)
    if (url.pathname === "/api/upload" && request.method === "POST") {
      return handleUploadRequest(request, env);
    }

    // Delete Endpoint (Protected)
    if (url.pathname === "/api/images" && request.method === "DELETE") {
      return handleDeleteImage(request, env);
    }

    // Serve React static assets
    return env.ASSETS.fetch(request);
  },
};

async function handleLogin(request, env) {
  try {
    const { username, password, turnstileToken } = await request.json();

    // 1. Verify Turnstile CAPTCHA Token
    const turnstileRes = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          secret: env.TURNSTILE_SECRET_KEY,
          response: turnstileToken,
        }),
      },
    );

    const turnstileData = await turnstileRes.json();
    if (!turnstileData.success) {
      return corsify(
        new Response(JSON.stringify({ error: "Captcha verification failed" }), {
          status: 400,
        }),
      );
    }

    // 2. Check Credentials
    if (
      username !== env.DASHBOARD_USERNAME ||
      password !== env.DASHBOARD_PASSWORD
    ) {
      return corsify(
        new Response(
          JSON.stringify({ error: "Invalid username or password" }),
          { status: 401 },
        ),
      );
    }

    // 3. Issue Auth Token (JWT Expires in 24 hours)
    const token = await signJWT(
      { user: username, exp: Date.now() + 86400000 },
      env.JWT_SECRET,
    );

    const headers = new Headers({
      "Content-Type": "application/json",
      "Set-Cookie": `auth_token=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=86400`,
    });

    return corsify(
      new Response(JSON.stringify({ success: true }), { headers }),
    );
  } catch (err) {
    return corsify(
      new Response(JSON.stringify({ error: err.message }), { status: 500 }),
    );
  }
}

async function handleGetFolders(request, env) {
  try {
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${env.CLOUDINARY_CLOUD_NAME}/folders`,
      {
        headers: {
          Authorization: `Basic ${btoa(`${env.CLOUDINARY_API_KEY}:${env.CLOUDINARY_API_SECRET}`)}`,
        },
      },
    );

    const data = await res.json();
    const folderNames = (data.folders || []).map((f) => f.name);

    return corsify(
      new Response(JSON.stringify(folderNames), {
        headers: { "Content-Type": "application/json" },
      }),
    );
  } catch (error) {
    return corsify(
      new Response(JSON.stringify({ error: "Failed to fetch folders" }), {
        status: 500,
      }),
    );
  }
}

async function handleAuthCheck(request, env) {
  const payload = await requireAuth(request, env);
  if (!payload) {
    return corsify(
      new Response(JSON.stringify({ authenticated: false }), { status: 401 }),
    );
  }

  return corsify(
    new Response(JSON.stringify({ authenticated: true }), { status: 200 }),
  );
}

async function handleUploadRequest(request, env) {
  const payload = await requireAuth(request, env);
  if (!payload) {
    return corsify(
      new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 }),
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const folder = formData.get("folder");

    if (!file || !folder) {
      return corsify(
        new Response(
          JSON.stringify({ error: "File and folder are required" }),
          { status: 400 },
        ),
      );
    }

    // Enforce the size cap server-side too — the frontend check alone can be bypassed.
    if (typeof file.size === "number" && file.size > MAX_UPLOAD_BYTES) {
      return corsify(
        new Response(JSON.stringify({ error: "File exceeds the 10MB limit" }), {
          status: 400,
        }),
      );
    }

    const cloudinaryFormData = new FormData();
    cloudinaryFormData.append("file", file);
    cloudinaryFormData.append("folder", folder);

    const uploadResponse = await fetch(
      `https://api.cloudinary.com/v1_1/${env.CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${btoa(`${env.CLOUDINARY_API_KEY}:${env.CLOUDINARY_API_SECRET}`)}`,
        },
        body: cloudinaryFormData,
      },
    );

    const uploadData = await uploadResponse.json();

    if (!uploadResponse.ok) {
      return corsify(
        new Response(
          JSON.stringify({
            error: uploadData.error?.message || "Upload failed",
          }),
          { status: uploadResponse.status },
        ),
      );
    }

    return corsify(
      new Response(
        JSON.stringify({
          success: true,
          url: uploadData.secure_url,
          publicId: uploadData.public_id,
        }),
        { status: 200 },
      ),
    );
  } catch (error) {
    return corsify(
      new Response(JSON.stringify({ error: error.message }), { status: 500 }),
    );
  }
}

// Delete one or more images from Cloudinary by public_id.
// Body: { "publicId": "folder/name" } or { "publicIds": ["folder/a", "folder/b"] }
async function handleDeleteImage(request, env) {
  const payload = await requireAuth(request, env);
  if (!payload) {
    return corsify(
      new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 }),
    );
  }

  try {
    const body = await request.json();
    const publicIds = body.publicIds || (body.publicId ? [body.publicId] : []);

    if (!publicIds.length) {
      return corsify(
        new Response(
          JSON.stringify({ error: "publicId or publicIds is required" }),
          { status: 400 },
        ),
      );
    }

    const query = publicIds
      .map((id) => `public_ids[]=${encodeURIComponent(id)}`)
      .join("&");

    const deleteResponse = await fetch(
      `https://api.cloudinary.com/v1_1/${env.CLOUDINARY_CLOUD_NAME}/resources/image/upload?${query}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Basic ${btoa(`${env.CLOUDINARY_API_KEY}:${env.CLOUDINARY_API_SECRET}`)}`,
        },
      },
    );

    const data = await deleteResponse.json();

    if (!deleteResponse.ok) {
      return corsify(
        new Response(
          JSON.stringify({ error: "Failed to delete image", details: data }),
          { status: deleteResponse.status },
        ),
      );
    }

    return corsify(
      new Response(
        JSON.stringify({ success: true, deleted: data.deleted || {} }),
        { status: 200 },
      ),
    );
  } catch (error) {
    return corsify(
      new Response(JSON.stringify({ error: error.message }), { status: 500 }),
    );
  }
}

async function handleGalleryRequest(request, env) {
  try {
    const url = new URL(request.url);
    const folder = url.searchParams.get("folder");

    if (!folder) {
      return new Response(JSON.stringify({ error: "Folder required" }), {
        status: 400,
      });
    }

    const result = await fetch(
      `https://api.cloudinary.com/v1_1/${env.CLOUDINARY_CLOUD_NAME}/resources/search?expression=folder=${folder}`,
      {
        headers: {
          Authorization: `Basic ${btoa(`${env.CLOUDINARY_API_KEY}:${env.CLOUDINARY_API_SECRET}`)}`,
        },
      },
    );

    const data = await result.json();
    const images = (data.resources || []).map((img) => ({
      src: img.secure_url.replace(
        "/upload/",
        "/upload/f_auto,q_auto,w_800,e_sharpen:150/",
      ),
      alt: img.public_id.split("/").pop().replace(/[-_]/g, " "),
      category: folder,
      // Exposed so the frontend can request deletion by exact public_id.
      publicId: img.public_id,
    }));

    return corsify(
      new Response(JSON.stringify(images), {
        headers: { "Content-Type": "application/json" },
      }),
    );
  } catch {
    return new Response(JSON.stringify({ error: "Failed to fetch images" }), {
      status: 500,
    });
  }
}
