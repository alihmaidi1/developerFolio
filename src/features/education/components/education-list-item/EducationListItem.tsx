import { useState } from "react";
import { ArrowDown, ArrowUp, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { resolveAssetUrl } from "@/shared/lib/asset-url";
import type {
  AdminEducation,
  EducationOrderDirection,
} from "../../model/education.types";
import styles from "./EducationListItem.module.css";

interface EducationListItemProps {
  entry: AdminEducation;
  canMoveUp: boolean;
  canMoveDown: boolean;
  isReordering: boolean;
  onDelete: (entry: AdminEducation) => void;
  onReorder: (educationId: string, direction: EducationOrderDirection) => void;
}

const dateFormatter = new Intl.DateTimeFormat("en", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

export function EducationListItem({
  entry,
  canMoveUp,
  canMoveDown,
  isReordering,
  onDelete,
  onReorder,
}: EducationListItemProps) {
  const [hasImageError, setHasImageError] = useState(false);
  const resolvedLogoUrl = resolveAssetUrl(entry.logoUrl);
  const showLogo = resolvedLogoUrl && !hasImageError;

  return (
    <article className={styles.entry}>
      <span
        className={styles.order}
        aria-label={`Display order ${entry.sortOrder + 1}`}
      >
        {String(entry.sortOrder + 1).padStart(2, "0")}
      </span>

      <div className={styles.identity}>
        <div className={styles.thumbnail}>
          {showLogo ? (
            <img
              src={resolvedLogoUrl ?? undefined}
              alt=""
              onError={() => setHasImageError(true)}
            />
          ) : (
            <span aria-hidden="true">
              {entry.schoolName.charAt(0).toUpperCase()}
            </span>
          )}
        </div>
        <div className={styles.entryCopy}>
          <h2>{entry.schoolName}</h2>
          <p>{entry.degree}</p>
        </div>
      </div>

      <div className={styles.meta} aria-label="Duration">
        <strong>{entry.duration}</strong>
        <small>
          {entry.descriptionBullets.length > 0
            ? `${entry.descriptionBullets.length} highlight${entry.descriptionBullets.length === 1 ? "" : "s"}`
            : "No highlights"}
        </small>
      </div>

      <div className={styles.statusBlock}>
        <span className={entry.isPublished ? styles.published : styles.draft}>
          <span aria-hidden="true" />
          {entry.isPublished ? "Published" : "Draft"}
        </span>
        <small>
          Updated {dateFormatter.format(new Date(entry.updatedAtUtc))}
        </small>
      </div>

      <div className={styles.links} aria-label={`${entry.schoolName} actions`}>
        <button
          className={styles.moveButton}
          type="button"
          title="Move entry up"
          aria-label={`Move ${entry.schoolName} up`}
          onClick={() => onReorder(entry.id, "up")}
          disabled={!canMoveUp || isReordering}
        >
          <ArrowUp aria-hidden="true" />
        </button>
        <button
          className={styles.moveButton}
          type="button"
          title="Move entry down"
          aria-label={`Move ${entry.schoolName} down`}
          onClick={() => onReorder(entry.id, "down")}
          disabled={!canMoveDown || isReordering}
        >
          <ArrowDown aria-hidden="true" />
        </button>
        <Link
          to={`/admin/education/${entry.id}/edit`}
          title="Edit entry"
          aria-label={`Edit ${entry.schoolName}`}
        >
          <Pencil aria-hidden="true" />
        </Link>
        <button
          className={styles.deleteButton}
          type="button"
          aria-label={`Delete ${entry.schoolName}`}
          onClick={() => onDelete(entry)}
          disabled={isReordering}
        >
          <Trash2 aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}
