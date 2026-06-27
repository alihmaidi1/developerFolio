import { useState } from "react";
import { ArrowUpRight, Code2 } from "lucide-react";
import { resolveAssetUrl } from "@/shared/lib/asset-url";
import { ErrorState } from "@/shared/ui";
import Loading from "@/shared/ui/loading/Loading";
import type { LandingProject } from "../api/landing.api";
import { useLandingProjects } from "../hooks/useLandingData";
import SectionShell from "../components/section-shell/SectionShell";
import sectionStyles from "../components/section-shell/SectionShell.module.css";
import { useProjectOverlay } from "../components/project-overlay/project-overlay-context";
import styles from "./ProjectsSection.module.css";

const MAX_TAGS = 4;

export function ProjectsSection() {
  const projectsQuery = useLandingProjects();

  if (projectsQuery.isError) {
    return (
      <SectionShell id="projects" eyebrow="Selected work" title="Projects">
        <div className={sectionStyles.feedback}>
          <ErrorState
            compact
            title="Projects are temporarily unavailable."
            description="Retry without reloading the page."
            actionLabel="Retry"
            onAction={() => void projectsQuery.refetch()}
          />
        </div>
      </SectionShell>
    );
  }

  if (projectsQuery.isPending) {
    return (
      <SectionShell id="projects" eyebrow="Selected work" title="Projects">
        <div className={sectionStyles.feedback}>
          <Loading />
        </div>
      </SectionShell>
    );
  }

  const projects = projectsQuery.data ?? [];
  if (projects.length === 0) {
    return null;
  }

  return (
    <SectionShell
      id="projects"
      eyebrow="Selected work"
      title="Projects"
      subtitle="A curated mix of products and experiments — built end to end with React and ASP.NET Core."
    >
      <div className={styles.grid}>
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </SectionShell>
  );
}

function ProjectCard({ project }: { project: LandingProject }) {
  const [imageFailed, setImageFailed] = useState(false);
  const { openProject } = useProjectOverlay();
  const imageUrl = resolveAssetUrl(project.imageUrl);
  const showImage = imageUrl && !imageFailed;
  const visibleTags = project.technologies.slice(0, MAX_TAGS);
  const hidden = project.technologies.length - visibleTags.length;

  // Clicking anywhere on the card opens the case-study overlay, except for the
  // external action links which retain their own click behavior.
  const handleCardClick = () => {
    openProject(project);
  };

  return (
    <article
      className={styles.card}
      onClick={handleCardClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openProject(project);
        }
      }}
      role="button"
      tabIndex={0}
      data-cursor="hover"
      aria-label={`Open case study for ${project.title}`}
    >
      <div className={styles.media}>
        {showImage ? (
          <img
            src={imageUrl}
            alt={`${project.title} preview`}
            loading="lazy"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className={styles.mediaFallback}>
            {project.title.charAt(0).toUpperCase()}
          </div>
        )}
        {visibleTags.length > 0 && (
          <div className={styles.tags}>
            {visibleTags.map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
            {hidden > 0 && (
              <span className={`${styles.tag} ${styles.tagMore}`}>
                +{hidden}
              </span>
            )}
          </div>
        )}
      </div>

      <div className={styles.body}>
        <h3 className={styles.title}>{project.title}</h3>
        <p className={styles.summary}>{project.summary}</p>

        {(project.liveUrl || project.repositoryUrl) && (
          <div className={styles.links}>
            {project.liveUrl && (
              <a
                className={`${styles.link} ${styles.linkPrimary}`}
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                data-cursor="hover"
              >
                Live demo
                <ArrowUpRight aria-hidden="true" />
              </a>
            )}
            {project.repositoryUrl && (
              <a
                className={`${styles.link} ${styles.linkGhost}`}
                href={project.repositoryUrl}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                data-cursor="hover"
              >
                <Code2 aria-hidden="true" />
                Code
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
