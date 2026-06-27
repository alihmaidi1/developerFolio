import { useRef, useState } from "react";
import { ArrowUpRight, Code2, X } from "lucide-react";
import { resolveAssetUrl } from "@/shared/lib/asset-url";
import type { LandingProject } from "../../api/landing.api";
import { AppearingText } from "../appearing-text/AppearingText";
import { HologramFrame } from "../hologram-frame/HologramFrame";
import { useProjectOverlay } from "./project-overlay-context";
import styles from "./ProjectOverlay.module.css";

/**
 * Fullscreen project case-study overlay. Renders nothing when no project is
 * active. CSS keyframe animations run on mount (no class flipping needed).
 * Inner content is keyed on project.id so internal state (image-failed, scroll
 * position) resets when switching between projects.
 */
export function ProjectOverlay() {
  const { activeProject, closeProject } = useProjectOverlay();

  if (!activeProject) return null;

  return (
    <div
      className={styles.root}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-overlay-title"
    >
      <button
        type="button"
        className={styles.backdrop}
        onClick={closeProject}
        aria-label="Close project"
      />

      <span className={styles.sweep} aria-hidden="true" />

      <div className={styles.shell}>
        <ProjectOverlayBody
          key={activeProject.id}
          project={activeProject}
          onClose={closeProject}
        />
      </div>
    </div>
  );
}

function ProjectOverlayBody({
  project,
  onClose,
}: {
  project: LandingProject;
  onClose: () => void;
}) {
  const [imageFailed, setImageFailed] = useState(false);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const imageUrl = resolveAssetUrl(project.imageUrl);
  const showImage = imageUrl && !imageFailed;

  return (
    <HologramFrame
      variant="raised"
      label={`// project · ${project.id.slice(0, 6)}`}
      tag="CASE STUDY"
      corners
      scanlines
      className={styles.frame}
    >
      <button
        type="button"
        className={styles.close}
        onClick={onClose}
        aria-label="Close project"
        data-cursor="hover"
      >
        <X aria-hidden="true" />
      </button>

      <div ref={scrollerRef} className={styles.scroller}>
        <div className={styles.hero}>
          {showImage ? (
            <img
              className={styles.heroImage}
              src={imageUrl}
              alt={`${project.title} preview`}
              onError={() => setImageFailed(true)}
            />
          ) : (
            <div className={styles.heroFallback}>
              {project.title.charAt(0).toUpperCase()}
            </div>
          )}
          <div className={styles.heroGradient} aria-hidden="true" />
        </div>

        <header className={styles.header}>
          <span className={styles.eyebrow}>// case study</span>
          <h1 id="project-overlay-title" className={styles.title}>
            <AppearingText stagger={0.04}>{project.title}</AppearingText>
          </h1>
          <p className={styles.summary}>{project.summary}</p>
        </header>

        {project.technologies.length > 0 && (
          <div className={styles.tags}>
            <span className={styles.tagsLabel}>// stack</span>
            <div className={styles.tagsList}>
              {project.technologies.map((tech) => (
                <span key={tech} className={styles.tag}>
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {project.description && (
          <section className={styles.description}>
            <span className={styles.descLabel}>// notes</span>
            <p className={styles.descBody}>{project.description}</p>
          </section>
        )}

        {(project.liveUrl || project.repositoryUrl) && (
          <footer className={styles.actions}>
            {project.liveUrl && (
              <a
                className={`${styles.action} ${styles.actionPrimary}`}
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                data-cursor="hover"
              >
                Visit live
                <ArrowUpRight aria-hidden="true" />
              </a>
            )}
            {project.repositoryUrl && (
              <a
                className={`${styles.action} ${styles.actionGhost}`}
                href={project.repositoryUrl}
                target="_blank"
                rel="noreferrer"
                data-cursor="hover"
              >
                <Code2 aria-hidden="true" />
                Source code
              </a>
            )}
          </footer>
        )}
      </div>
    </HologramFrame>
  );
}
