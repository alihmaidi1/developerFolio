import { useCallback, useState } from "react";
import { Link2, Plus } from "lucide-react";
import { resolveApiError } from "@/shared/lib/api-error";
import { ErrorState, Loading } from "@/shared/ui";
import { ContactForm } from "../components/contact-form/ContactForm";
import { DeleteSocialLinkDialog } from "../components/delete-social-link-dialog/DeleteSocialLinkDialog";
import { GreetingForm } from "../components/greeting-form/GreetingForm";
import {
  SettingsTabs,
  type SettingsTab,
} from "../components/settings-tabs/SettingsTabs";
import { SocialLinkForm } from "../components/social-link-form/SocialLinkForm";
import { SocialLinkListItem } from "../components/social-link-list-item/SocialLinkListItem";
import { useContact } from "../hooks/useContact";
import { useDeleteSocialLink } from "../hooks/useDeleteSocialLink";
import { useGreeting } from "../hooks/useGreeting";
import { useReorderSocialLink } from "../hooks/useReorderSocialLink";
import { useSocialLinks } from "../hooks/useSocialLinks";
import type { AdminSocialLink } from "../model/settings.types";
import styles from "./AdminSettingsPage.module.css";

export function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("greeting");

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Configuration</p>
          <h1>Settings</h1>
          <p className={styles.intro}>
            Greeting, contact details, and social channels shown on the public
            portfolio.
          </p>
        </div>

        <div className={styles.headerActions}>
          <SettingsTabs active={activeTab} onChange={setActiveTab} />
        </div>
      </header>

      {activeTab === "greeting" && <GreetingPanel />}
      {activeTab === "contact" && <ContactPanel />}
      {activeTab === "social" && <SocialLinksPanel />}
    </section>
  );
}

function GreetingPanel() {
  const query = useGreeting();

  if (query.isPending) {
    return <LoadingPanel />;
  }

  if (query.isError) {
    return (
      <div className={styles.feedbackPanel}>
        <ErrorState
          compact
          title="Greeting could not be loaded"
          description={resolveApiError(query.error)}
          actionLabel="Try again"
          onAction={() => void query.refetch()}
        />
      </div>
    );
  }

  return <GreetingForm greeting={query.data} />;
}

function ContactPanel() {
  const query = useContact();

  if (query.isPending) {
    return <LoadingPanel />;
  }

  if (query.isError) {
    return (
      <div className={styles.feedbackPanel}>
        <ErrorState
          compact
          title="Contact could not be loaded"
          description={resolveApiError(query.error)}
          actionLabel="Try again"
          onAction={() => void query.refetch()}
        />
      </div>
    );
  }

  return <ContactForm contact={query.data} />;
}

function SocialLinksPanel() {
  const [editing, setEditing] = useState<AdminSocialLink | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<AdminSocialLink | null>(
    null,
  );

  const query = useSocialLinks();
  const reorder = useReorderSocialLink();
  const deleteMutation = useDeleteSocialLink();

  const links = query.data ?? [];
  const showForm = Boolean(editing) || isCreating;

  const resetForms = useCallback(() => {
    setEditing(null);
    setIsCreating(false);
  }, []);

  const confirmDelete = useCallback(async () => {
    if (!deleteTarget) return;
    try {
      await deleteMutation.mutateAsync(deleteTarget.id);
      setDeleteTarget(null);
    } catch {
      // noop
    }
  }, [deleteTarget, deleteMutation]);

  const closeDeleteDialog = useCallback(() => {
    if (deleteMutation.isPending) return;
    deleteMutation.reset();
    setDeleteTarget(null);
  }, [deleteMutation]);

  return (
    <>
      <div className={styles.headerActions} style={{ marginBottom: 16 }}>
        <button
          type="button"
          className={styles.addButton}
          onClick={() => {
            setEditing(null);
            setIsCreating(true);
          }}
        >
          <Plus aria-hidden="true" />
          Add social link
        </button>
      </div>

      {showForm && (
        <SocialLinkForm
          existing={editing}
          onCancel={resetForms}
          onSuccess={resetForms}
        />
      )}

      {query.isPending && <LoadingPanel />}

      {query.isError && (
        <div className={styles.feedbackPanel}>
          <ErrorState
            compact
            title="Social links could not be loaded"
            description={resolveApiError(query.error)}
            actionLabel="Try again"
            onAction={() => void query.refetch()}
          />
        </div>
      )}

      {!query.isPending && !query.isError && links.length === 0 && (
        <div className={styles.emptyState}>
          <span className={styles.emptyIcon}>
            <Link2 aria-hidden="true" />
          </span>
          <h2>No social links yet</h2>
          <p>Add the channels you want to share on the public portfolio.</p>
        </div>
      )}

      {!query.isPending && !query.isError && links.length > 0 && (
        <section
          className={styles.listSection}
          aria-labelledby="social-links-title"
        >
          <header className={styles.listHeader}>
            <div>
              <h2 id="social-links-title">Social channels</h2>
              <p>Ordered exactly as they appear in the public footer.</p>
            </div>
            <span>{links.length} items</span>
          </header>

          <div>
            {reorder.isError && (
              <p className={styles.reorderError} role="alert">
                {resolveApiError(reorder.error)}
              </p>
            )}
            {links.map((entry, index) => (
              <SocialLinkListItem
                key={entry.id}
                entry={entry}
                canMoveUp={index > 0}
                canMoveDown={index < links.length - 1}
                isReordering={reorder.isPending}
                onEdit={(item) => {
                  setIsCreating(false);
                  setEditing(item);
                }}
                onDelete={setDeleteTarget}
                onReorder={(id, direction) => {
                  reorder.reset();
                  reorder.mutate({ socialLinkId: id, direction });
                }}
              />
            ))}
          </div>
        </section>
      )}

      <DeleteSocialLinkDialog
        entry={deleteTarget}
        isPending={deleteMutation.isPending}
        error={
          deleteMutation.isError ? resolveApiError(deleteMutation.error) : null
        }
        onCancel={closeDeleteDialog}
        onConfirm={() => void confirmDelete()}
      />
    </>
  );
}

function LoadingPanel() {
  return <Loading label="Loading settings" variant="inline" />;
}
