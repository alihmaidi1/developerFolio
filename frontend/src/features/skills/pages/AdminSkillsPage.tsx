import { useCallback, useMemo, useState } from "react";
import { BrainCircuit, Plus, Wand2 } from "lucide-react";
import { resolveApiError } from "@/shared/lib/api-error";
import { ErrorState, Loading } from "@/shared/ui";
import { DeleteSkillDialog } from "../components/delete-skill-dialog/DeleteSkillDialog";
import {
  SkillsTabs,
  type SkillsTab,
} from "../components/skills-tabs/SkillsTabs";
import { SkillStatementForm } from "../components/skill-statement-form/SkillStatementForm";
import { SkillStatementListItem } from "../components/skill-statement-list-item/SkillStatementListItem";
import { SoftwareSkillForm } from "../components/software-skill-form/SoftwareSkillForm";
import { SoftwareSkillListItem } from "../components/software-skill-list-item/SoftwareSkillListItem";
import { useDeleteSkillStatement } from "../hooks/useDeleteSkillStatement";
import { useDeleteSoftwareSkill } from "../hooks/useDeleteSoftwareSkill";
import { useReorderSkillStatement } from "../hooks/useReorderSkillStatement";
import { useReorderSoftwareSkill } from "../hooks/useReorderSoftwareSkill";
import { useSkillStatements } from "../hooks/useSkillStatements";
import { useSoftwareSkills } from "../hooks/useSoftwareSkills";
import type { AdminSkillStatement } from "../model/skill-statement.types";
import type { AdminSoftwareSkill } from "../model/software-skill.types";
import styles from "./AdminSkillsPage.module.css";

type DeleteTarget =
  | { kind: "statement"; entry: AdminSkillStatement }
  | { kind: "software"; entry: AdminSoftwareSkill };

export function AdminSkillsPage() {
  const [activeTab, setActiveTab] = useState<SkillsTab>("statements");
  const [editingStatement, setEditingStatement] =
    useState<AdminSkillStatement | null>(null);
  const [isCreatingStatement, setIsCreatingStatement] = useState(false);
  const [editingSoftwareSkill, setEditingSoftwareSkill] =
    useState<AdminSoftwareSkill | null>(null);
  const [isCreatingSoftwareSkill, setIsCreatingSoftwareSkill] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<DeleteTarget | null>(null);

  const statementsQuery = useSkillStatements();
  const softwareSkillsQuery = useSoftwareSkills();
  const reorderStatement = useReorderSkillStatement();
  const reorderSoftware = useReorderSoftwareSkill();
  const deleteStatement = useDeleteSkillStatement();
  const deleteSoftware = useDeleteSoftwareSkill();

  const statements = useMemo(
    () => statementsQuery.data ?? [],
    [statementsQuery.data],
  );
  const softwareSkills = useMemo(
    () => softwareSkillsQuery.data ?? [],
    [softwareSkillsQuery.data],
  );

  const resetStatementForms = useCallback(() => {
    setEditingStatement(null);
    setIsCreatingStatement(false);
  }, []);
  const resetSoftwareForms = useCallback(() => {
    setEditingSoftwareSkill(null);
    setIsCreatingSoftwareSkill(false);
  }, []);

  const startCreateStatement = () => {
    setEditingStatement(null);
    setIsCreatingStatement(true);
  };
  const startEditStatement = (entry: AdminSkillStatement) => {
    setIsCreatingStatement(false);
    setEditingStatement(entry);
  };

  const startCreateSoftwareSkill = () => {
    setEditingSoftwareSkill(null);
    setIsCreatingSoftwareSkill(true);
  };
  const startEditSoftwareSkill = (entry: AdminSoftwareSkill) => {
    setIsCreatingSoftwareSkill(false);
    setEditingSoftwareSkill(entry);
  };

  const confirmDelete = useCallback(async () => {
    if (!deleteTarget) {
      return;
    }
    try {
      if (deleteTarget.kind === "statement") {
        await deleteStatement.mutateAsync(deleteTarget.entry.id);
      } else {
        await deleteSoftware.mutateAsync(deleteTarget.entry.id);
      }
      setDeleteTarget(null);
    } catch {
      // noop
    }
  }, [deleteTarget, deleteStatement, deleteSoftware]);

  const closeDeleteDialog = useCallback(() => {
    if (deleteStatement.isPending || deleteSoftware.isPending) {
      return;
    }
    deleteStatement.reset();
    deleteSoftware.reset();
    setDeleteTarget(null);
  }, [deleteStatement, deleteSoftware]);

  const deleteMeta = useMemo(() => {
    if (!deleteTarget) return null;
    if (deleteTarget.kind === "statement") {
      return {
        eyebrow: "Delete statement",
        title: "Delete this statement?",
        description: `“${deleteTarget.entry.text}” will be permanently removed.`,
        isPending: deleteStatement.isPending,
        error: deleteStatement.isError
          ? resolveApiError(deleteStatement.error)
          : null,
      };
    }
    return {
      eyebrow: "Delete software skill",
      title: `Delete “${deleteTarget.entry.name}”?`,
      description: `This permanently removes the skill from the public portfolio.`,
      isPending: deleteSoftware.isPending,
      error: deleteSoftware.isError
        ? resolveApiError(deleteSoftware.error)
        : null,
    };
  }, [deleteTarget, deleteStatement, deleteSoftware]);

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Content</p>
          <h1>Skills</h1>
          <p className={styles.intro}>
            Capabilities and software stack shown on the public portfolio.
          </p>
        </div>

        <div className={styles.headerActions}>
          <SkillsTabs
            active={activeTab}
            statementsCount={statements.length}
            softwareCount={softwareSkills.length}
            onChange={(tab) => {
              setActiveTab(tab);
              resetStatementForms();
              resetSoftwareForms();
            }}
          />
          {activeTab === "statements" ? (
            <button
              type="button"
              className={styles.addButton}
              onClick={startCreateStatement}
            >
              <Plus aria-hidden="true" />
              Add statement
            </button>
          ) : (
            <button
              type="button"
              className={styles.addButton}
              onClick={startCreateSoftwareSkill}
            >
              <Plus aria-hidden="true" />
              Add software skill
            </button>
          )}
        </div>
      </header>

      {activeTab === "statements" && (
        <StatementsPanel
          statements={statements}
          query={statementsQuery}
          editing={editingStatement}
          isCreating={isCreatingStatement}
          onCancelForm={resetStatementForms}
          onStartEdit={startEditStatement}
          onDelete={(entry) => setDeleteTarget({ kind: "statement", entry })}
          onReorder={(id, direction) => {
            reorderStatement.reset();
            reorderStatement.mutate({ skillStatementId: id, direction });
          }}
          isReordering={reorderStatement.isPending}
          reorderError={
            reorderStatement.isError
              ? resolveApiError(reorderStatement.error)
              : null
          }
        />
      )}

      {activeTab === "software" && (
        <SoftwareSkillsPanel
          skills={softwareSkills}
          query={softwareSkillsQuery}
          editing={editingSoftwareSkill}
          isCreating={isCreatingSoftwareSkill}
          onCancelForm={resetSoftwareForms}
          onStartEdit={startEditSoftwareSkill}
          onDelete={(entry) => setDeleteTarget({ kind: "software", entry })}
          onReorder={(id, direction) => {
            reorderSoftware.reset();
            reorderSoftware.mutate({ softwareSkillId: id, direction });
          }}
          isReordering={reorderSoftware.isPending}
          reorderError={
            reorderSoftware.isError
              ? resolveApiError(reorderSoftware.error)
              : null
          }
        />
      )}

      <DeleteSkillDialog
        open={Boolean(deleteTarget)}
        eyebrow={deleteMeta?.eyebrow ?? ""}
        title={deleteMeta?.title ?? ""}
        description={deleteMeta?.description ?? ""}
        isPending={deleteMeta?.isPending ?? false}
        error={deleteMeta?.error ?? null}
        onCancel={closeDeleteDialog}
        onConfirm={() => void confirmDelete()}
      />
    </section>
  );
}

interface StatementsPanelProps {
  statements: AdminSkillStatement[];
  query: ReturnType<typeof useSkillStatements>;
  editing: AdminSkillStatement | null;
  isCreating: boolean;
  onCancelForm: () => void;
  onStartEdit: (entry: AdminSkillStatement) => void;
  onDelete: (entry: AdminSkillStatement) => void;
  onReorder: (id: string, direction: "up" | "down") => void;
  isReordering: boolean;
  reorderError: string | null;
}

function StatementsPanel({
  statements,
  query,
  editing,
  isCreating,
  onCancelForm,
  onStartEdit,
  onDelete,
  onReorder,
  isReordering,
  reorderError,
}: StatementsPanelProps) {
  const showForm = Boolean(editing) || isCreating;

  return (
    <>
      {showForm && (
        <SkillStatementForm
          existing={editing}
          onCancel={onCancelForm}
          onSuccess={onCancelForm}
        />
      )}

      {query.isPending && <LoadingList />}

      {query.isError && (
        <div className={styles.feedbackPanel}>
          <ErrorState
            compact
            title="Statements could not be loaded"
            description={resolveApiError(query.error)}
            actionLabel="Try again"
            onAction={() => void query.refetch()}
          />
        </div>
      )}

      {!query.isPending && !query.isError && statements.length === 0 && (
        <div className={styles.emptyState}>
          <span className={styles.emptyIcon}>
            <Wand2 aria-hidden="true" />
          </span>
          <h2>No statements yet</h2>
          <p>
            Add the bullet points that describe what you build for users and
            teams.
          </p>
        </div>
      )}

      {!query.isPending && !query.isError && statements.length > 0 && (
        <section
          className={styles.listSection}
          aria-labelledby="skill-statements-title"
        >
          <header className={styles.listHeader}>
            <div>
              <h2 id="skill-statements-title">Statements</h2>
              <p>Capability bullets displayed on the public portfolio.</p>
            </div>
            <span>{statements.length} items</span>
          </header>

          <div>
            {reorderError && (
              <p className={styles.reorderError} role="alert">
                {reorderError}
              </p>
            )}
            {statements.map((entry, index) => (
              <SkillStatementListItem
                key={entry.id}
                entry={entry}
                canMoveUp={index > 0}
                canMoveDown={index < statements.length - 1}
                isReordering={isReordering}
                onEdit={onStartEdit}
                onDelete={onDelete}
                onReorder={onReorder}
              />
            ))}
          </div>
        </section>
      )}
    </>
  );
}

interface SoftwareSkillsPanelProps {
  skills: AdminSoftwareSkill[];
  query: ReturnType<typeof useSoftwareSkills>;
  editing: AdminSoftwareSkill | null;
  isCreating: boolean;
  onCancelForm: () => void;
  onStartEdit: (entry: AdminSoftwareSkill) => void;
  onDelete: (entry: AdminSoftwareSkill) => void;
  onReorder: (id: string, direction: "up" | "down") => void;
  isReordering: boolean;
  reorderError: string | null;
}

function SoftwareSkillsPanel({
  skills,
  query,
  editing,
  isCreating,
  onCancelForm,
  onStartEdit,
  onDelete,
  onReorder,
  isReordering,
  reorderError,
}: SoftwareSkillsPanelProps) {
  const showForm = Boolean(editing) || isCreating;

  return (
    <>
      {showForm && (
        <SoftwareSkillForm
          existing={editing}
          onCancel={onCancelForm}
          onSuccess={onCancelForm}
        />
      )}

      {query.isPending && <LoadingList />}

      {query.isError && (
        <div className={styles.feedbackPanel}>
          <ErrorState
            compact
            title="Software skills could not be loaded"
            description={resolveApiError(query.error)}
            actionLabel="Try again"
            onAction={() => void query.refetch()}
          />
        </div>
      )}

      {!query.isPending && !query.isError && skills.length === 0 && (
        <div className={styles.emptyState}>
          <span className={styles.emptyIcon}>
            <BrainCircuit aria-hidden="true" />
          </span>
          <h2>No software skills yet</h2>
          <p>
            Add the tools and stacks you work with using Font Awesome icons.
          </p>
        </div>
      )}

      {!query.isPending && !query.isError && skills.length > 0 && (
        <section
          className={styles.listSection}
          aria-labelledby="software-skills-title"
        >
          <header className={styles.listHeader}>
            <div>
              <h2 id="software-skills-title">Software skills</h2>
              <p>Stacks and tools shown as icons on the public portfolio.</p>
            </div>
            <span>{skills.length} items</span>
          </header>

          <div>
            {reorderError && (
              <p className={styles.reorderError} role="alert">
                {reorderError}
              </p>
            )}
            {skills.map((entry, index) => (
              <SoftwareSkillListItem
                key={entry.id}
                entry={entry}
                canMoveUp={index > 0}
                canMoveDown={index < skills.length - 1}
                isReordering={isReordering}
                onEdit={onStartEdit}
                onDelete={onDelete}
                onReorder={onReorder}
              />
            ))}
          </div>
        </section>
      )}
    </>
  );
}

function LoadingList() {
  return <Loading label="Loading skills" variant="inline" />;
}
