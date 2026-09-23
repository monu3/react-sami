import React, { useState, useEffect, useCallback } from "react";
import {
  AlertCircle,
  CheckCircle2,
  FolderOpen,
  ImageOff,
  Loader2,
  Trash2,
  UploadCloud,
} from "lucide-react";
import { LoginForm } from "./login-form";
import { Attachment } from "../components/ui/attachment";
import { Button } from "../components/ui/button";
import { FileUpload } from "../components/ui/file-upload";
import { cn } from "../lib/utils";

type GalleryImage = {
  src: string;
  alt: string;
  category: string;
  publicId: string;
};

type StatusMessage = {
  type: "success" | "error";
  text: string;
} | null;

export function Dashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Login form state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [loginStatusMsg, setLoginStatusMsg] = useState("");

  // Folders
  const [folders, setFolders] = useState<string[]>([]);
  const [foldersLoading, setFoldersLoading] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState("");

  // Upload
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState<StatusMessage>(null);

  // Gallery / delete
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [galleryLoading, setGalleryLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

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
    if (!isAuthenticated) return;
    setFoldersLoading(true);
    fetch("/api/folders")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setFolders(data);
          // Auto-select the first folder so an admin lands on something
          // usable right away instead of an empty page.
          if (data.length > 0)
            setSelectedFolder((current) => current || data[0]);
        }
      })
      .catch((err) => console.error("Error fetching folders:", err))
      .finally(() => setFoldersLoading(false));
  }, [isAuthenticated]);

  const loadGallery = useCallback((folder: string) => {
    if (!folder) {
      setGalleryImages([]);
      return;
    }
    setGalleryLoading(true);
    fetch(`/api/gallery?folder=${encodeURIComponent(folder)}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setGalleryImages(data);
      })
      .catch((err) => console.error("Error fetching gallery:", err))
      .finally(() => setGalleryLoading(false));
  }, []);

  useEffect(() => {
    if (isAuthenticated) loadGallery(selectedFolder);
  }, [isAuthenticated, selectedFolder, loadGallery]);

  const handleSelectFolder = (folder: string) => {
    setSelectedFolder(folder);
    setFiles([]);
    setStatus(null);
  };

  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement | HTMLDivElement>,
  ) => {
    e.preventDefault();
    if (!turnstileToken)
      return setLoginStatusMsg("Please complete the Captcha check.");

    setLoginStatusMsg("Logging in...");
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, turnstileToken }),
    });

    const data = await res.json();
    if (res.ok) {
      setIsAuthenticated(true);
      setLoginStatusMsg("");
    } else {
      setLoginStatusMsg(data.error || "Login failed.");
    }
  };

  const handleUpload = async () => {
    if (!files.length || !selectedFolder) return;

    setUploading(true);
    setStatus(null);

    try {
      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", selectedFolder);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Upload failed.");
        }
      }

      setStatus({
        type: "success",
        text: `${files.length} image${files.length === 1 ? "" : "s"} uploaded to "${selectedFolder}".`,
      });
      setFiles([]);
      loadGallery(selectedFolder);
    } catch (error) {
      setStatus({
        type: "error",
        text: error instanceof Error ? error.message : "Upload failed.",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteImage = async (image: GalleryImage) => {
    if (!confirm(`Delete "${image.alt}"? This can't be undone.`)) return;

    setDeletingId(image.publicId);
    try {
      const res = await fetch("/api/images", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ publicId: image.publicId }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Delete failed.");
      }

      setGalleryImages((current) =>
        current.filter((img) => img.publicId !== image.publicId),
      );
      setStatus({ type: "success", text: `"${image.alt}" deleted.` });
    } catch (error) {
      setStatus({
        type: "error",
        text: error instanceof Error ? error.message : "Delete failed.",
      });
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-svh items-center justify-center">
        <Loader2 className="size-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  // Login screen
  if (!isAuthenticated) {
    return (
      <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
        <div className="w-full max-w-sm md:max-w-4xl">
          <LoginForm
            username={username}
            password={password}
            statusMsg={loginStatusMsg}
            onUsernameChange={(e) => setUsername(e.target.value)}
            onPasswordChange={(e) => setPassword(e.target.value)}
            onTurnstileSuccess={setTurnstileToken}
            onSubmit={handleLogin}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-svh bg-muted/30 px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-6">
          <p className="mb-1 text-sm font-medium text-primary">
            Gallery manager
          </p>
          <h2 className="text-3xl font-semibold tracking-tight">
            Manage your gallery
          </h2>
          <p className="mt-2 text-muted-foreground">
            Pick a folder, then upload new images or remove existing ones.
          </p>
        </div>

        {/* Step 1: Folder picker — always visible, nothing hidden behind a dialog */}
        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <div className="mb-3 flex items-center gap-2">
            <FolderOpen className="size-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold">Folder</h3>
          </div>

          {foldersLoading ? (
            <div className="flex items-center gap-2 py-2 text-sm text-muted-foreground">
              <Loader2 className="size-4 animate-spin" />
              Loading folders...
            </div>
          ) : folders.length === 0 ? (
            <p className="py-2 text-sm text-muted-foreground">
              No folders found yet. Create one in Cloudinary first.
            </p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {folders.map((folder) => (
                <button
                  key={folder}
                  type="button"
                  onClick={() => handleSelectFolder(folder)}
                  className={cn(
                    "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
                    selectedFolder === folder
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-input bg-background text-foreground hover:bg-muted",
                  )}
                >
                  {folder}
                </button>
              ))}
            </div>
          )}
        </div>

        {!selectedFolder ? (
          <div className="mt-4 flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed bg-card px-6 py-14 text-center">
            <FolderOpen className="size-6 text-muted-foreground" />
            <p className="text-sm font-medium">Select a folder above</p>
            <p className="text-sm text-muted-foreground">
              Choose where you want to upload or manage images.
            </p>
          </div>
        ) : (
          <>
            {/* Status banner */}
            {status && (
              <div
                className={cn(
                  "mt-4 flex items-start gap-2 rounded-lg border px-3.5 py-2.5 text-sm",
                  status.type === "success"
                    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                    : "border-destructive/20 bg-destructive/10 text-destructive",
                )}
              >
                {status.type === "success" ? (
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0" />
                ) : (
                  <AlertCircle className="mt-0.5 size-4 shrink-0" />
                )}
                {status.text}
              </div>
            )}

            {/* Step 2: Upload — inline, no dialog to open first */}
            <div className="mt-4 rounded-xl border bg-card p-5 shadow-sm">
              <div className="mb-3 flex items-center gap-2">
                <UploadCloud className="size-4 text-muted-foreground" />
                <h3 className="text-sm font-semibold">
                  Upload to &ldquo;{selectedFolder}&rdquo;
                </h3>
              </div>

              <FileUpload
                files={files}
                onFilesChange={setFiles}
                maxSizeInMb={10}
              />

              {files.length > 0 && (
                <div className="mt-4 flex flex-col gap-2">
                  {files.map((file) => (
                    <Attachment
                      key={`${file.name}-${file.size}-${file.lastModified}`}
                      file={file}
                      onRemove={() =>
                        setFiles((current) => current.filter((f) => f !== file))
                      }
                    />
                  ))}
                </div>
              )}

              <div className="mt-4 flex justify-end">
                <Button
                  type="button"
                  disabled={uploading || !files.length}
                  onClick={handleUpload}
                  className="gap-2"
                >
                  {uploading && <Loader2 className="size-4 animate-spin" />}
                  {uploading
                    ? "Uploading..."
                    : files.length
                      ? `Upload ${files.length} image${files.length === 1 ? "" : "s"}`
                      : "Upload"}
                </Button>
              </div>
            </div>

            {/* Step 3: Existing images — browse and delete, right on the page */}
            <div className="mt-4 rounded-xl border bg-card p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-sm font-semibold">
                  Images in &ldquo;{selectedFolder}&rdquo;
                  {!galleryLoading && (
                    <span className="ml-1.5 text-muted-foreground">
                      ({galleryImages.length})
                    </span>
                  )}
                </h3>
                {galleryLoading && (
                  <Loader2 className="size-4 animate-spin text-muted-foreground" />
                )}
              </div>

              {!galleryLoading && galleryImages.length === 0 && (
                <div className="flex flex-col items-center justify-center gap-2 py-12 text-center text-sm text-muted-foreground">
                  <ImageOff className="size-5" />
                  No images in this folder yet. Upload some above.
                </div>
              )}

              {galleryImages.length > 0 && (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                  {galleryImages.map((image) => (
                    <div
                      key={image.publicId}
                      className="group relative aspect-square overflow-hidden rounded-lg border bg-muted"
                    >
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="size-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 flex flex-col justify-between bg-gradient-to-t from-black/70 via-black/0 to-black/0 p-2 opacity-0 transition-opacity group-hover:opacity-100">
                        <div className="flex justify-end">
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="size-8"
                            disabled={deletingId === image.publicId}
                            onClick={() => handleDeleteImage(image)}
                          >
                            {deletingId === image.publicId ? (
                              <Loader2 className="size-4 animate-spin" />
                            ) : (
                              <Trash2 className="size-4" />
                            )}
                            <span className="sr-only">Delete {image.alt}</span>
                          </Button>
                        </div>
                        <p className="truncate text-xs font-medium text-white">
                          {image.alt}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
