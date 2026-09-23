import React, { useState, useEffect } from "react";
import { LoginForm } from "./login-form";

export function Dashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Form states
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [folders, setFolders] = useState<string[]>([]);
  const [selectedFolder, setSelectedFolder] = useState("");
  const [statusMsg, setStatusMsg] = useState("");
  const [uploading, setUploading] = useState(false);

  // Check auth status on load
  useEffect(() => {
    fetch("/api/auth/check")
      .then((res) => {
        if (res.ok) setIsAuthenticated(true);
      })
      .finally(() => setLoading(false));
  }, []);

  // Fetch live folders from Worker API
  useEffect(() => {
    if (isAuthenticated) {
      fetch("/api/folders")
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) setFolders(data);
        })
        .catch((err) => console.error("Error fetching folders:", err));
    }
  }, [isAuthenticated]);

  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement | HTMLDivElement>,
  ) => {
    e.preventDefault();
    if (!turnstileToken)
      return setStatusMsg("Please complete the Captcha check.");

    setStatusMsg("Logging in...");
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, turnstileToken }),
    });

    const data = await res.json();
    if (res.ok) {
      setIsAuthenticated(true);
      setStatusMsg("");
    } else {
      setStatusMsg(data.error || "Login failed.");
    }
  };

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file || !selectedFolder)
      return setStatusMsg("Please select a file and folder.");

    setUploading(true);
    setStatusMsg("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", selectedFolder);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setUploading(false);

    if (res.ok) {
      setStatusMsg("Image uploaded successfully!");
      setFile(null);
    } else {
      setStatusMsg(`Upload Error: ${data.error}`);
    }
  };

  if (loading)
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>Loading...</div>
    );

  // Render Login Form if Not Authenticated
  if (!isAuthenticated) {
    return (
      <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
        <div className="w-full max-w-sm md:max-w-4xl">
          <LoginForm
            username={username}
            password={password}
            statusMsg={statusMsg}
            onUsernameChange={(e) => setUsername(e.target.value)}
            onPasswordChange={(e) => setPassword(e.target.value)}
            onTurnstileSuccess={setTurnstileToken}
            onSubmit={handleLogin}
          />
        </div>
      </div>
    );
  }

  // Render Image Upload Form if Authenticated
  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "40px auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
      }}
    >
      <h2>Gallery Upload Dashboard</h2>
      <form
        onSubmit={handleUpload}
        style={{ display: "flex", flexDirection: "column", gap: "16px" }}
      >
        <div>
          <label>Select Folder:</label>
          <select
            value={selectedFolder}
            onChange={(e) => setSelectedFolder(e.target.value)}
            required
            className="w-full p-2 border rounded"
          >
            <option value="">-- Choose Existing Folder --</option>
            {folders.map((folderName) => (
              <option key={folderName} value={folderName}>
                {folderName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Select Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            required
            style={{ width: "100%", marginTop: "4px" }}
          />
        </div>

        <button
          type="submit"
          disabled={uploading}
          style={{
            padding: "10px",
            backgroundColor: "#10b981",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
          }}
        >
          {uploading ? "Uploading..." : "Upload Image"}
        </button>
      </form>
      {statusMsg && <p style={{ marginTop: "12px" }}>{statusMsg}</p>}
    </div>
  );
}
