import * as React from "react";
import { ImagePlus, Upload } from "lucide-react";

import { cn } from "../../lib/utils";
import { Button } from "./button";

type FileUploadProps = {
  files: File[];
  onFilesChange: (files: File[]) => void;
  accept?: string;
  /** Omit (or pass Infinity) to allow an unlimited number of files. */
  maxFiles?: number;
  maxSizeInMb?: number;
  className?: string;
};

function FileUpload({
  files,
  onFilesChange,
  accept = "image/*",
  maxFiles = Infinity,
  maxSizeInMb = 10,
  className,
}: FileUploadProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const [error, setError] = React.useState("");

  const addFiles = (incomingFiles: File[]) => {
    setError("");

    const validFiles = incomingFiles.filter((file) => {
      if (!file.type.startsWith("image/")) {
        setError("Only image files can be uploaded.");
        return false;
      }
      if (file.size > maxSizeInMb * 1024 * 1024) {
        setError(`${file.name} is larger than ${maxSizeInMb}MB.`);
        return false;
      }
      return true;
    });

    const nextFiles = [...files];
    let hitLimit = false;
    for (const file of validFiles) {
      if (nextFiles.length >= maxFiles) {
        hitLimit = true;
        break;
      }
      if (
        !nextFiles.some(
          (currentFile) =>
            currentFile.name === file.name && currentFile.size === file.size,
        )
      ) {
        nextFiles.push(file);
      }
    }

    if (hitLimit) {
      setError(`You can upload up to ${maxFiles} images at a time.`);
    }

    onFilesChange(nextFiles);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    addFiles(Array.from(event.target.files ?? []));
    event.target.value = "";
  };

  const hasLimit = Number.isFinite(maxFiles);

  return (
    <div className={cn("space-y-3", className)}>
      <div
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            inputRef.current?.click();
          }
        }}
        onDragEnter={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragOver={(event) => event.preventDefault()}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setIsDragging(false);
          addFiles(Array.from(event.dataTransfer.files));
        }}
        className={cn(
          "flex min-h-52 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed bg-muted/20 px-6 py-8 text-center transition-colors",
          "hover:border-primary/60 hover:bg-primary/5 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:outline-none",
          isDragging && "border-primary bg-primary/10",
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple
          className="sr-only"
          onChange={handleInputChange}
        />
        <div className="mb-4 flex size-12 items-center justify-center rounded-full border bg-background text-primary shadow-xs">
          {isDragging ? (
            <Upload className="size-5" />
          ) : (
            <ImagePlus className="size-5" />
          )}
        </div>
        <p className="text-sm font-semibold">Drag &amp; drop images here</p>
        <p className="mt-1 text-xs text-muted-foreground">
          or click to browse · {hasLimit ? `max ${maxFiles} files, ` : ""}up to{" "}
          {maxSizeInMb}MB each
        </p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="pointer-events-none mt-4"
        >
          Browse files
        </Button>
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}

export { FileUpload };
