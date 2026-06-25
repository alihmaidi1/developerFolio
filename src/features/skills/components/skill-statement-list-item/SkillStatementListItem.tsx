import { ArrowDown, ArrowUp, Pencil, Trash2 } from "lucide-react";
import type {
  AdminSkillStatement,
  SkillStatementOrderDirection,
} from "../../model/skill-statement.types";
import styles from "./SkillStatementListItem.module.css";

interface SkillStatementListItemProps {
  entry: AdminSkillStatement;
  canMoveUp: boolean;
  canMoveDown: boolean;
  isReordering: boolean;
  onEdit: (entry: AdminSkillStatement) => void;
  onDelete: (entry: AdminSkillStatement) => void;
  onReorder: (id: string, direction: SkillStatementOrderDirection) => void;
}

export function SkillStatementListItem({
  entry,
  canMoveUp,
  canMoveDown,
  isReordering,
  onEdit,
  onDelete,
  onReorder,
}: SkillStatementListItemProps) {
  return (
    <article className={styles.entry}>
      <span
        className={styles.order}
        aria-label={`Display order ${entry.sortOrder + 1}`}
      >
        {String(entry.sortOrder + 1).padStart(2, "0")}
      </span>

      <p className={styles.text}>{entry.text}</p>

      <span
        className={`${styles.status} ${entry.isPublished ? styles.published : styles.draft}`}
      >
        <span className={styles.statusDot} aria-hidden="true" />
        {entry.isPublished ? "Published" : "Draft"}
      </span>

      <div className={styles.actions} aria-label="Statement actions">
        <button
          type="button"
          className={styles.button}
          title="Move up"
          aria-label="Move up"
          onClick={() => onReorder(entry.id, "up")}
          disabled={!canMoveUp || isReordering}
        >
          <ArrowUp aria-hidden="true" />
        </button>
        <button
          type="button"
          className={styles.button}
          title="Move down"
          aria-label="Move down"
          onClick={() => onReorder(entry.id, "down")}
          disabled={!canMoveDown || isReordering}
        >
          <ArrowDown aria-hidden="true" />
        </button>
        <button
          type="button"
          className={styles.button}
          title="Edit"
          aria-label="Edit statement"
          onClick={() => onEdit(entry)}
        >
          <Pencil aria-hidden="true" />
        </button>
        <button
          type="button"
          className={`${styles.button} ${styles.deleteButton}`}
          title="Delete"
          aria-label="Delete statement"
          onClick={() => onDelete(entry)}
        >
          <Trash2 aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}
