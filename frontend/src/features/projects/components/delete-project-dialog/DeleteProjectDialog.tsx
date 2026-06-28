import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AlertTriangle, X } from "lucide-react";
import { LoadingSpinner } from "@/shared/ui";
import type { AdminProject } from "../../model/project.types";
import styles from "./DeleteProjectDialog.module.css";

interface DeleteProjectDialogProps {
  project: AdminProject | null;
  isPending: boolean;
  error: string | null;
  onCancel: () => void;
  onConfirm: () => void;
}

export function DeleteProjectDialog({
  project,
  isPending,
  error,
  onCancel,
  onConfirm,
}: DeleteProjectDialogProps) {
  const cancelButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) {
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
  }, [isPending, onCancel, project]);

  if (!project) {
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
        aria-labelledby="delete-project-title"
        aria-describedby="delete-project-description"
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
        <p className={styles.eyebrow}>Delete project</p>
        <h2 id="delete-project-title">Delete “{project.title}”?</h2>
        <p id="delete-project-description" className={styles.description}>
          This permanently removes the project and its technologies. This action
          cannot be undone.
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
              "Delete project"
            )}
          </button>
        </div>
      </section>
    </div>,
    document.body,
  );
}
