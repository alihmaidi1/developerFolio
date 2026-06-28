import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AlertTriangle, X } from "lucide-react";
import { LoadingSpinner } from "@/shared/ui";
import styles from "./DeleteSkillDialog.module.css";

interface DeleteSkillDialogProps {
  open: boolean;
  eyebrow: string;
  title: string;
  description: string;
  isPending: boolean;
  error: string | null;
  onCancel: () => void;
  onConfirm: () => void;
}

export function DeleteSkillDialog({
  open,
  eyebrow,
  title,
  description,
  isPending,
  error,
  onCancel,
  onConfirm,
}: DeleteSkillDialogProps) {
  const cancelButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) {
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
  }, [open, isPending, onCancel]);

  if (!open) {
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
        aria-labelledby="delete-skill-title"
        aria-describedby="delete-skill-description"
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
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h2 id="delete-skill-title">{title}</h2>
        <p id="delete-skill-description" className={styles.description}>
          {description}
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
