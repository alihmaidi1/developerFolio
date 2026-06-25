import { useCallback, useState } from "react";
import { Briefcase, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { resolveApiError } from "@/shared/lib/api-error";
import { ErrorState } from "@/shared/ui";
import { DeleteWorkExperienceDialog } from "../components/delete-work-experience-dialog/DeleteWorkExperienceDialog";
import { WorkExperienceListItem } from "../components/work-experience-list-item/WorkExperienceListItem";
import { useAdminWorkExperience } from "../hooks/useAdminWorkExperience";
import { useDeleteWorkExperience } from "../hooks/useDeleteWorkExperience";
import { useReorderWorkExperience } from "../hooks/useReorderWorkExperience";
import type {
  AdminWorkExperience,
  WorkExperienceOrderDirection,
} from "../model/work-experience.types";
import styles from "./AdminWorkExperiencePage.module.css";

export function AdminWorkExperiencePage() {
  const [entryToDelete, setEntryToDelete] =
    useState<AdminWorkExperience | null>(null);
  const workExperienceQuery = useAdminWorkExperience();
  const deleteWorkExperience = useDeleteWorkExperience();
  const reorderWorkExperience = useReorderWorkExperience();
  const {
    error: deleteError,
    isError: isDeleteError,
    isPending: isDeleting,
    mutateAsync: deleteWorkExperienceAsync,
    reset: resetDeleteWorkExperience,
  } = deleteWorkExperience;
  const entries = workExperienceQuery.data ?? [];
  const publishedCount = entries.filter((entry) => entry.isPublished).length;

  const closeDeleteDialog = useCallback(() => {
    if (isDeleting) {
      return;
    }

    resetDeleteWorkExperience();
    setEntryToDelete(null);
  }, [isDeleting, resetDeleteWorkExperience]);

  const confirmDelete = useCallback(async () => {
    if (!entryToDelete) {
      return;
    }

    try {
      await deleteWorkExperienceAsync(entryToDelete.id);
      setEntryToDelete(null);
    } catch {
      return;
    }
  }, [deleteWorkExperienceAsync, entryToDelete]);

  const reorder = (
    workExperienceId: string,
    direction: WorkExperienceOrderDirection,
  ) => {
    reorderWorkExperience.reset();
    reorderWorkExperience.mutate({ workExperienceId, direction });
  };

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Content</p>
          <h1>Work experience</h1>
          <p className={styles.intro}>
            Roles and companies displayed on the public portfolio timeline.
          </p>
        </div>

        <div className={styles.headerActions}>
          {!workExperienceQuery.isPending && !workExperienceQuery.isError && (
            <dl className={styles.summary} aria-label="Work experience summary">
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
          <Link className={styles.addButton} to="/admin/work-experience/new">
            <Plus aria-hidden="true" />
            Add entry
          </Link>
        </div>
      </header>

      {workExperienceQuery.isPending && <WorkExperienceLoading />}

      {workExperienceQuery.isError && (
        <div className={styles.feedbackPanel}>
          <ErrorState
            compact
            title="Work experience could not be loaded"
            description={resolveApiError(workExperienceQuery.error)}
            actionLabel="Try again"
            onAction={() => void workExperienceQuery.refetch()}
          />
        </div>
      )}

      {!workExperienceQuery.isPending &&
        !workExperienceQuery.isError &&
        entries.length === 0 && (
          <div className={styles.emptyState}>
            <span className={styles.emptyIcon}>
              <Briefcase aria-hidden="true" />
            </span>
            <h2>No work experience entries yet</h2>
            <p>Your roles will appear here after the first entry is created.</p>
          </div>
        )}

      {!workExperienceQuery.isPending &&
        !workExperienceQuery.isError &&
        entries.length > 0 && (
          <section
            className={styles.listSection}
            aria-labelledby="work-experience-list-title"
          >
            <header className={styles.listHeader}>
              <div>
                <h2 id="work-experience-list-title">Work experience entries</h2>
                <p>Ordered exactly as they appear on the public portfolio.</p>
              </div>
              <span>{entries.length} items</span>
            </header>

            <div className={styles.columnLabels} aria-hidden="true">
              <span>Order</span>
              <span>Company</span>
              <span>Date</span>
              <span>Status</span>
              <span>Actions</span>
            </div>

            <div className={styles.projectList}>
              {reorderWorkExperience.isError && (
                <p className={styles.reorderError} role="alert">
                  {resolveApiError(reorderWorkExperience.error)}
                </p>
              )}
              {entries.map((entry, index) => (
                <WorkExperienceListItem
                  key={entry.id}
                  entry={entry}
                  canMoveUp={index > 0}
                  canMoveDown={index < entries.length - 1}
                  isReordering={reorderWorkExperience.isPending}
                  onDelete={setEntryToDelete}
                  onReorder={reorder}
                />
              ))}
            </div>
          </section>
        )}

      <DeleteWorkExperienceDialog
        entry={entryToDelete}
        isPending={isDeleting}
        error={isDeleteError ? resolveApiError(deleteError) : null}
        onCancel={closeDeleteDialog}
        onConfirm={() => void confirmDelete()}
      />
    </section>
  );
}

function WorkExperienceLoading() {
  return (
    <div
      className={styles.loading}
      role="status"
      aria-label="Loading work experience entries"
    >
      <div className={styles.loadingHeader} />
      {[0, 1, 2].map((item) => (
        <div className={styles.loadingRow} key={item}>
          <span />
          <div>
            <strong />
            <small />
          </div>
          <i />
          <i />
        </div>
      ))}
    </div>
  );
}
