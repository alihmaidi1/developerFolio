import { ArrowDown, ArrowUp, Pencil, Trash2 } from "lucide-react";
import type {
  AdminSocialLink,
  SocialLinkOrderDirection,
} from "../../model/settings.types";
import styles from "./SocialLinkListItem.module.css";

interface SocialLinkListItemProps {
  entry: AdminSocialLink;
  canMoveUp: boolean;
  canMoveDown: boolean;
  isReordering: boolean;
  onEdit: (entry: AdminSocialLink) => void;
  onDelete: (entry: AdminSocialLink) => void;
  onReorder: (id: string, direction: SocialLinkOrderDirection) => void;
}

export function SocialLinkListItem({
  entry,
  canMoveUp,
  canMoveDown,
  isReordering,
  onEdit,
  onDelete,
  onReorder,
}: SocialLinkListItemProps) {
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
          style={{
            color: "var(--admin-color-muted)",
            fontSize: "0.7rem",
            display: "block",
          }}
        >
          {entry.url}
        </small>
        <small
          style={{
            color: "var(--admin-color-subtle)",
            fontSize: "0.66rem",
          }}
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

      <div className={styles.actions} aria-label="Social link actions">
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
          aria-label="Edit social link"
          onClick={() => onEdit(entry)}
        >
          <Pencil aria-hidden="true" />
        </button>
        <button
          type="button"
          className={`${styles.button} ${styles.deleteButton}`}
          title="Delete"
          aria-label="Delete social link"
          onClick={() => onDelete(entry)}
        >
          <Trash2 aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}
