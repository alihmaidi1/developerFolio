import { useEffect, useId, useMemo } from "react";
import { ImageIcon } from "lucide-react";
import { FormField } from "@/shared/ui";
import { resolveAssetUrl } from "@/shared/lib/asset-url";
import { PROJECT_IMAGE_ALLOWED_TYPES } from "../../model/project-form.schema";
import styles from "./ImageUploadField.module.css";

interface ImageUploadFieldProps {
  label: string;
  value: File | null;
  existingImageUrl: string | null;
  error?: string;
  onSelect: (file: File | null) => void;
}

export function ImageUploadField({
  label,
  value,
  existingImageUrl,
  error,
  onSelect,
}: ImageUploadFieldProps) {
  const inputId = useId();
  const errorId = `${inputId}-error`;

  const previewUrl = useMemo(
    () => (value ? URL.createObjectURL(value) : null),
    [value],
  );

  useEffect(
    () => () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    },
    [previewUrl],
  );

  const displayedUrl = previewUrl ?? resolveAssetUrl(existingImageUrl);

  return (
    <FormField label={label} htmlFor={inputId} error={error} errorId={errorId}>
      <label
        className={styles.dropzone}
        htmlFor={inputId}
        data-invalid={Boolean(error)}
      >
        <div className={styles.thumbnail}>
          {displayedUrl ? (
            <img src={displayedUrl} alt="" />
          ) : (
            <ImageIcon aria-hidden="true" />
          )}
        </div>
        <div className={styles.copy}>
          <strong>
            {value
              ? value.name
              : displayedUrl
                ? "Replace current image"
                : "Choose an image"}
          </strong>
          <small>PNG, JPEG, WEBP, or GIF up to 5 MB.</small>
        </div>
        <input
          id={inputId}
          className={styles.input}
          type="file"
          accept={PROJECT_IMAGE_ALLOWED_TYPES.join(",")}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          onChange={(event) => {
            const [file] = Array.from(event.target.files ?? []);
            onSelect(file ?? null);
            event.target.value = "";
          }}
        />
      </label>
    </FormField>
  );
}
