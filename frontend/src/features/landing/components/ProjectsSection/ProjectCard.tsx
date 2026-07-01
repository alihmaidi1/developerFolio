import type { CSSProperties, MouseEvent } from "react";
import styles from "./ProjectsSection.module.css";
import type { LandingProject } from "../../landing.types";

interface ProjectCardProps {
  project: LandingProject;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const handleMove = (event: MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const mx = ((event.clientX - rect.left) / rect.width) * 100;
    const my = ((event.clientY - rect.top) / rect.height) * 100;
    event.currentTarget.style.setProperty("--mx", `${mx}%`);
    event.currentTarget.style.setProperty("--my", `${my}%`);
  };

  return (
    <article
      className={styles.card}
      data-anim-project-card
      onMouseMove={handleMove}
      style={{ "--mx": "50%", "--my": "0%" } as CSSProperties}
    >
      <header className={styles.cardHeader}>
        <span className={styles.cardIndex}>
          / 0{index + 1}
        </span>
        <span className={styles.cardTag}>Project</span>
      </header>

      <h3 className={styles.cardTitle}>{project.title}</h3>
      <p className={styles.cardDescription}>{project.description}</p>

      <div className={styles.cardTech}>
        {project.tech.map((t) => (
          <span key={t}>{t}</span>
        ))}
      </div>

      {project.highlight ? (
        <div className={styles.cardHighlight}>{project.highlight}</div>
      ) : null}

      <a
        className={styles.cardCta}
        href={project.href ?? "#contact"}
        aria-label={`View ${project.title} details`}
      >
        View Details
        <span aria-hidden="true">→</span>
      </a>
    </article>
  );
}
