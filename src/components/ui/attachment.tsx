import * as React from "react";
import { FileImage, X } from "lucide-react";

import { cn } from "../../lib/utils";
import { Button } from "./button";

type AttachmentProps = {
  file: File;
  onRemove: () => void;
  className?: string;
};

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function Attachment({ file, onRemove, className }: AttachmentProps) {
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);

  React.useEffect(() => {
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-lg border bg-background p-2 pr-3",
        className,
      )}
    >
      <div className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-md border bg-muted">
        {previewUrl ? (
          <img
            src={previewUrl}
            alt={file.name}
            className="size-full object-cover"
          />
        ) : (
          <FileImage className="size-4 text-muted-foreground" />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium leading-tight">
          {file.name}
        </p>
        <p className="text-xs text-muted-foreground">
          {formatFileSize(file.size)}
        </p>
      </div>

      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="size-7 shrink-0 text-muted-foreground hover:text-destructive"
        onClick={onRemove}
      >
        <X className="size-4" />
        <span className="sr-only">Remove {file.name}</span>
      </Button>
    </div>
  );
}

export { Attachment };
