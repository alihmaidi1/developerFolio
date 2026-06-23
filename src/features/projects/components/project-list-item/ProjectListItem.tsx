import { useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  Code2,
  Globe2,
  Pencil,
  Trash2,
} from "lucide-react";
import { Link } from "react-router-dom";
import type {
  AdminProject,
  ProjectOrderDirection,
} from "../../model/project.types";
import styles from "./ProjectListItem.module.css";

interface ProjectListItemProps {
  project: AdminProject;
  canMoveUp: boolean;
  canMoveDown: boolean;
  isReordering: boolean;
  onDelete: (project: AdminProject) => void;
  onReorder: (projectId: string, direction: ProjectOrderDirection) => void;
}

const dateFormatter = new Intl.DateTimeFormat("en", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

export function ProjectListItem({
  project,
  canMoveUp,
  canMoveDown,
  isReordering,
  onDelete,
  onReorder,
}: ProjectListItemProps) {
  const [hasImageError, setHasImageError] = useState(false);
  const visibleTechnologies = project.technologies.slice(0, 3);
  const hiddenTechnologiesCount =
    project.technologies.length - visibleTechnologies.length;
  const showImage = project.imageUrl && !hasImageError;

  return (
    <article className={styles.project}>
      <span
        className={styles.order}
        aria-label={`Display order ${project.sortOrder + 1}`}
      >
        {String(project.sortOrder + 1).padStart(2, "0")}
      </span>

      <div className={styles.identity}>
        <div className={styles.thumbnail}>
          {showImage ? (
            <img
              src={project.imageUrl ?? undefined}
              alt=""
              onError={() => setHasImageError(true)}
            />
          ) : (
            <span aria-hidden="true">
              {project.title.charAt(0).toUpperCase()}
            </span>
          )}
        </div>
        <div className={styles.projectCopy}>
          <h2>{project.title}</h2>
          <p>{project.summary}</p>
        </div>
      </div>

      <div className={styles.technologies} aria-label="Technologies">
        {visibleTechnologies.length > 0 ? (
          <>
            {visibleTechnologies.map((technology) => (
              <span key={technology}>{technology}</span>
            ))}
            {hiddenTechnologiesCount > 0 && (
              <small>+{hiddenTechnologiesCount}</small>
            )}
          </>
        ) : (
          <small>Not specified</small>
        )}
      </div>

      <div className={styles.statusBlock}>
        <span className={project.isPublished ? styles.published : styles.draft}>
          <span aria-hidden="true" />
          {project.isPublished ? "Published" : "Draft"}
        </span>
        <small>
          Updated {dateFormatter.format(new Date(project.updatedAtUtc))}
        </small>
      </div>

      <div className={styles.links} aria-label={`${project.title} actions`}>
        <button
          className={styles.moveButton}
          type="button"
          title="Move project up"
          aria-label={`Move ${project.title} up`}
          onClick={() => onReorder(project.id, "up")}
          disabled={!canMoveUp || isReordering}
        >
          <ArrowUp aria-hidden="true" />
        </button>
        <button
          className={styles.moveButton}
          type="button"
          title="Move project down"
          aria-label={`Move ${project.title} down`}
          onClick={() => onReorder(project.id, "down")}
          disabled={!canMoveDown || isReordering}
        >
          <ArrowDown aria-hidden="true" />
        </button>
        <Link
          to={`/admin/projects/${project.id}/edit`}
          title="Edit project"
          aria-label={`Edit ${project.title}`}
        >
          <Pencil aria-hidden="true" />
        </Link>
        {project.repositoryUrl && (
          <a
            href={project.repositoryUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={`Open ${project.title} repository`}
          >
            <Code2 aria-hidden="true" />
          </a>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={`Open ${project.title} live site`}
          >
            <Globe2 aria-hidden="true" />
          </a>
        )}
        <button
          className={styles.deleteButton}
          type="button"
          aria-label={`Delete ${project.title}`}
          onClick={() => onDelete(project)}
          disabled={isReordering}
        >
          <Trash2 aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}
