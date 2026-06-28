import { ArrowDown, ArrowUp, Pencil, Trash2 } from "lucide-react";
import type {
  AdminSoftwareSkill,
  SoftwareSkillOrderDirection,
} from "../../model/software-skill.types";
import styles from "./SoftwareSkillListItem.module.css";

interface SoftwareSkillListItemProps {
  entry: AdminSoftwareSkill;
  canMoveUp: boolean;
  canMoveDown: boolean;
  isReordering: boolean;
  onEdit: (entry: AdminSoftwareSkill) => void;
  onDelete: (entry: AdminSoftwareSkill) => void;
  onReorder: (id: string, direction: SoftwareSkillOrderDirection) => void;
}

export function SoftwareSkillListItem({
  entry,
  canMoveUp,
  canMoveDown,
  isReordering,
  onEdit,
  onDelete,
  onReorder,
}: SoftwareSkillListItemProps) {
  return (
    <article className={styles.entry}>
      <span
        className={styles.order}
        aria-label={`Display order ${entry.sortOrder + 1}`}
      >
        {String(entry.sortOrder + 1).padStart(2, "0")}
      </span>

      <div>
        <strong style={{ display: "block", fontSize: "0.82rem" }}>
          {entry.name}
        </strong>
        <small
          style={{ color: "var(--admin-color-muted)", fontSize: "0.7rem" }}
        >
          {entry.iconClassName}
        </small>
      </div>

      <span
        className={`${styles.status} ${entry.isPublished ? styles.published : styles.draft}`}
      >
        <span className={styles.statusDot} aria-hidden="true" />
        {entry.isPublished ? "Published" : "Draft"}
      </span>

      <div className={styles.actions} aria-label="Software skill actions">
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
          aria-label="Edit software skill"
          onClick={() => onEdit(entry)}
        >
          <Pencil aria-hidden="true" />
        </button>
        <button
          type="button"
          className={`${styles.button} ${styles.deleteButton}`}
          title="Delete"
          aria-label="Delete software skill"
          onClick={() => onDelete(entry)}
        >
          <Trash2 aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}
