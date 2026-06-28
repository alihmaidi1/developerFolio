import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AlertTriangle, X } from "lucide-react";
import { LoadingSpinner } from "@/shared/ui";
import type { AdminSocialLink } from "../../model/settings.types";
import styles from "./DeleteSocialLinkDialog.module.css";

interface DeleteSocialLinkDialogProps {
  entry: AdminSocialLink | null;
  isPending: boolean;
  error: string | null;
  onCancel: () => void;
  onConfirm: () => void;
}

export function DeleteSocialLinkDialog({
  entry,
  isPending,
  error,
  onCancel,
  onConfirm,
}: DeleteSocialLinkDialogProps) {
  const cancelButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!entry) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    cancelButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isPending) {
        onCancel();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [entry, isPending, onCancel]);

  if (!entry) {
    return null;
  }

  return createPortal(
    <div
      className={styles.backdrop}
      onMouseDown={isPending ? undefined : onCancel}
    >
      <section
        className={styles.dialog}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-social-link-title"
        aria-describedby="delete-social-link-description"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          className={styles.closeButton}
          type="button"
          aria-label="Close delete confirmation"
          onClick={onCancel}
          disabled={isPending}
        >
          <X aria-hidden="true" />
        </button>

        <span className={styles.icon}>
          <AlertTriangle aria-hidden="true" />
        </span>
        <p className={styles.eyebrow}>Delete social link</p>
        <h2 id="delete-social-link-title">Delete “{entry.name}”?</h2>
        <p id="delete-social-link-description" className={styles.description}>
          This permanently removes the link from the public portfolio.
        </p>

        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.actions}>
          <button
            ref={cancelButtonRef}
            className={styles.cancelButton}
            type="button"
            onClick={onCancel}
            disabled={isPending}
          >
            Cancel
          </button>
          <button
            className={styles.deleteButton}
            type="button"
            onClick={onConfirm}
            disabled={isPending}
          >
            {isPending ? (
              <>
                <LoadingSpinner className={styles.spinner} />
                Deleting
              </>
            ) : (
              "Delete"
            )}
          </button>
        </div>
      </section>
    </div>,
    document.body,
  );
}
