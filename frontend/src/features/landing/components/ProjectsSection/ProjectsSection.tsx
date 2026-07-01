import styles from "./ProjectsSection.module.css";
import { ProjectCard } from "./ProjectCard";
import type { LandingProject } from "../../landing.types";

interface ProjectsSectionProps {
  projects: LandingProject[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section
      id="projects"
      className="landing-section"
      data-anim-section="projects"
    >
      <span className="landing-eyebrow">03 / Selected Work</span>
      <h2 className="landing-section-title">Featured Projects</h2>
      <p className="landing-section-lede">
        A small set of production-style projects that show how I structure
        backends, APIs, and admin tooling end-to-end.
      </p>

      <div className={styles.grid}>
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
