import { useState } from "react";
import { ArrowDown, ArrowUp, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { resolveAssetUrl } from "@/shared/lib/asset-url";
import type {
  AdminWorkExperience,
  WorkExperienceOrderDirection,
} from "../../model/work-experience.types";
import styles from "./WorkExperienceListItem.module.css";

interface WorkExperienceListItemProps {
  entry: AdminWorkExperience;
  canMoveUp: boolean;
  canMoveDown: boolean;
  isReordering: boolean;
  onDelete: (entry: AdminWorkExperience) => void;
  onReorder: (
    workExperienceId: string,
    direction: WorkExperienceOrderDirection,
  ) => void;
}

const dateFormatter = new Intl.DateTimeFormat("en", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

export function WorkExperienceListItem({
  entry,
  canMoveUp,
  canMoveDown,
  isReordering,
  onDelete,
  onReorder,
}: WorkExperienceListItemProps) {
  const [hasImageError, setHasImageError] = useState(false);
  const resolvedLogoUrl = resolveAssetUrl(entry.companyLogoUrl);
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
              {entry.company.charAt(0).toUpperCase()}
            </span>
          )}
        </div>
        <div className={styles.entryCopy}>
          <h2>{entry.company}</h2>
          <p>{entry.role}</p>
        </div>
      </div>

      <div className={styles.meta} aria-label="Duration">
        <strong>{entry.date}</strong>
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

      <div className={styles.links} aria-label={`${entry.company} actions`}>
        <button
          className={styles.moveButton}
          type="button"
          title="Move entry up"
          aria-label={`Move ${entry.company} up`}
          onClick={() => onReorder(entry.id, "up")}
          disabled={!canMoveUp || isReordering}
        >
          <ArrowUp aria-hidden="true" />
        </button>
        <button
          className={styles.moveButton}
          type="button"
          title="Move entry down"
          aria-label={`Move ${entry.company} down`}
          onClick={() => onReorder(entry.id, "down")}
          disabled={!canMoveDown || isReordering}
        >
          <ArrowDown aria-hidden="true" />
        </button>
        <Link
          to={`/admin/work-experience/${entry.id}/edit`}
          title="Edit entry"
          aria-label={`Edit ${entry.company}`}
        >
          <Pencil aria-hidden="true" />
        </Link>
        <button
          className={styles.deleteButton}
          type="button"
          aria-label={`Delete ${entry.company}`}
          onClick={() => onDelete(entry)}
          disabled={isReordering}
        >
          <Trash2 aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}
