import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AlertTriangle, X } from "lucide-react";
import { LoadingSpinner } from "@/shared/ui";
import type { AdminWorkExperience } from "../../model/work-experience.types";
import styles from "./DeleteWorkExperienceDialog.module.css";

interface DeleteWorkExperienceDialogProps {
  entry: AdminWorkExperience | null;
  isPending: boolean;
  error: string | null;
  onCancel: () => void;
  onConfirm: () => void;
}

export function DeleteWorkExperienceDialog({
  entry,
  isPending,
  error,
  onCancel,
  onConfirm,
}: DeleteWorkExperienceDialogProps) {
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
  }, [isPending, onCancel, entry]);

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
        aria-labelledby="delete-work-experience-title"
        aria-describedby="delete-work-experience-description"
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
        <p className={styles.eyebrow}>Delete work experience</p>
        <h2 id="delete-work-experience-title">Delete “{entry.company}”?</h2>
        <p
          id="delete-work-experience-description"
          className={styles.description}
        >
          This permanently removes the entry, its highlights, and its company
          logo. This action cannot be undone.
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
              "Delete entry"
            )}
          </button>
        </div>
      </section>
    </div>,
    document.body,
  );
}
