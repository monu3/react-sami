// worker.js
import { createCors } from "itty-cors";

// Initialize CORS
const { preflight, corsify } = createCors({
  origins: ["*"],
  methods: ["GET"],
});

export default {
  async fetch(request, env, ctx) {
    // Handle preflight requests
    if (request.method === "OPTIONS") return preflight(request);

    const url = new URL(request.url);

    // Gallery endpoint
    if (url.pathname === "/api/gallery") {
      return handleGalleryRequest(request, env);
    }

    // Serve static assets from React build
    return env.ASSETS.fetch(request);
  },
};

async function handleGalleryRequest(request, env) {
  try {
    const url = new URL(request.url);
    const folder = url.searchParams.get("folder");

    if (!folder) {
      return new Response(
        JSON.stringify({ error: "Folder name is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Cloudinary API request
    const result = await fetch(
      `https://api.cloudinary.com/v1_1/${env.CLOUDINARY_CLOUD_NAME}/resources/search?expression=folder=${folder}`,
      {
        headers: {
          Authorization: `Basic ${btoa(
            `${env.CLOUDINARY_API_KEY}:${env.CLOUDINARY_API_SECRET}`
          )}`,
        },
      }
    );

    const data = await result.json();

    // ✅ Optimize the Cloudinary URLs
    const images = data.resources.map((img) => {
      const optimizedUrl = img.secure_url.replace(
        "/upload/",
        "/upload/f_auto,q_auto,w_800,e_sharpen:150/"
      );

      return {
        src: optimizedUrl,
        alt: img.public_id.split("/").pop().replace(/[-_]/g, " "),
        category: folder,
      };
    });

    return corsify(
      new Response(JSON.stringify(images), {
        headers: { "Content-Type": "application/json" },
      })
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch images" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
