import { useCallback, useState } from "react";
import { GraduationCap, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { resolveApiError } from "@/shared/lib/api-error";
import { ErrorState, Loading } from "@/shared/ui";
import { DeleteEducationDialog } from "../components/delete-education-dialog/DeleteEducationDialog";
import { EducationListItem } from "../components/education-list-item/EducationListItem";
import { useAdminEducation } from "../hooks/useAdminEducation";
import { useDeleteEducation } from "../hooks/useDeleteEducation";
import { useReorderEducation } from "../hooks/useReorderEducation";
import type {
  AdminEducation,
  EducationOrderDirection,
} from "../model/education.types";
import styles from "./AdminEducationPage.module.css";

export function AdminEducationPage() {
  const [entryToDelete, setEntryToDelete] = useState<AdminEducation | null>(
    null,
  );
  const educationQuery = useAdminEducation();
  const deleteEducation = useDeleteEducation();
  const reorderEducation = useReorderEducation();
  const {
    error: deleteError,
    isError: isDeleteError,
    isPending: isDeleting,
    mutateAsync: deleteEducationAsync,
    reset: resetDeleteEducation,
  } = deleteEducation;
  const entries = educationQuery.data ?? [];
  const publishedCount = entries.filter((entry) => entry.isPublished).length;

  const closeDeleteDialog = useCallback(() => {
    if (isDeleting) {
      return;
    }

    resetDeleteEducation();
    setEntryToDelete(null);
  }, [isDeleting, resetDeleteEducation]);

  const confirmDelete = useCallback(async () => {
    if (!entryToDelete) {
      return;
    }

    try {
      await deleteEducationAsync(entryToDelete.id);
      setEntryToDelete(null);
    } catch {
      return;
    }
  }, [deleteEducationAsync, entryToDelete]);

  const reorder = (educationId: string, direction: EducationOrderDirection) => {
    reorderEducation.reset();
    reorderEducation.mutate({ educationId, direction });
  };

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Content</p>
          <h1>Education</h1>
          <p className={styles.intro}>
            Schools and degrees displayed on the public portfolio timeline.
          </p>
        </div>

        <div className={styles.headerActions}>
          {!educationQuery.isPending && !educationQuery.isError && (
            <dl className={styles.summary} aria-label="Education summary">
              <div>
                <dt>Total</dt>
                <dd>{entries.length}</dd>
              </div>
              <div>
                <dt>Published</dt>
                <dd>{publishedCount}</dd>
              </div>
            </dl>
          )}
          <Link className={styles.addButton} to="/admin/education/new">
            <Plus aria-hidden="true" />
            Add entry
          </Link>
        </div>
      </header>

      {educationQuery.isPending && <EducationLoading />}

      {educationQuery.isError && (
        <div className={styles.feedbackPanel}>
          <ErrorState
            compact
            title="Education could not be loaded"
            description={resolveApiError(educationQuery.error)}
            actionLabel="Try again"
            onAction={() => void educationQuery.refetch()}
          />
        </div>
      )}

      {!educationQuery.isPending &&
        !educationQuery.isError &&
        entries.length === 0 && (
          <div className={styles.emptyState}>
            <span className={styles.emptyIcon}>
              <GraduationCap aria-hidden="true" />
            </span>
            <h2>No education entries yet</h2>
            <p>
              Your schools and degrees will appear here after the first entry is
              created.
            </p>
          </div>
        )}

      {!educationQuery.isPending &&
        !educationQuery.isError &&
        entries.length > 0 && (
          <section
            className={styles.listSection}
            aria-labelledby="education-list-title"
          >
            <header className={styles.listHeader}>
              <div>
                <h2 id="education-list-title">Education entries</h2>
                <p>Ordered exactly as they appear on the public portfolio.</p>
              </div>
              <span>{entries.length} items</span>
            </header>

            <div className={styles.columnLabels} aria-hidden="true">
              <span>Order</span>
              <span>School</span>
              <span>Duration</span>
              <span>Status</span>
              <span>Actions</span>
            </div>

            <div className={styles.projectList}>
              {reorderEducation.isError && (
                <p className={styles.reorderError} role="alert">
                  {resolveApiError(reorderEducation.error)}
                </p>
              )}
              {entries.map((entry, index) => (
                <EducationListItem
                  key={entry.id}
                  entry={entry}
                  canMoveUp={index > 0}
                  canMoveDown={index < entries.length - 1}
                  isReordering={reorderEducation.isPending}
                  onDelete={setEntryToDelete}
                  onReorder={reorder}
                />
              ))}
            </div>
          </section>
        )}

      <DeleteEducationDialog
        entry={entryToDelete}
        isPending={isDeleting}
        error={isDeleteError ? resolveApiError(deleteError) : null}
        onCancel={closeDeleteDialog}
        onConfirm={() => void confirmDelete()}
      />
    </section>
  );
}

function EducationLoading() {
  return <Loading label="Loading education entries" variant="inline" />;
}
