import { ArrowUpRight, GitBranch } from "lucide-react";
import { ErrorState } from "@/shared/ui";
import Loading from "@/shared/ui/loading/Loading";
import { useLandingProjects } from "../hooks/useLandingData";
import SectionShell from "../components/section-shell/SectionShell";
import sectionStyles from "../components/section-shell/SectionShell.module.css";
import styles from "./OpenSourceSection.module.css";

const MAX_TAGS = 3;

export function OpenSourceSection() {
  const projectsQuery = useLandingProjects();

  if (projectsQuery.isError) {
    return (
      <SectionShell id="opensource" eyebrow="Code" title="Open Source">
        <div className={sectionStyles.feedback}>
          <ErrorState
            compact
            title="Open source list unavailable."
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
      <SectionShell id="opensource" eyebrow="Code" title="Open Source">
        <div className={sectionStyles.feedback}>
          <Loading />
        </div>
      </SectionShell>
    );
  }

  const openSource = (projectsQuery.data ?? []).filter((project) =>
    Boolean(project.repositoryUrl),
  );

  if (openSource.length === 0) {
    return null;
  }

  return (
    <SectionShell
      id="opensource"
      eyebrow="Code"
      title="Open Source"
      subtitle="Projects with public source code — explore the repos, fork them, or open an issue."
    >
      <div className={styles.list}>
        {openSource.map((project) => (
          <a
            key={project.id}
            className={styles.row}
            href={project.repositoryUrl ?? "#"}
            target="_blank"
            rel="noreferrer"
          >
            <span className={styles.icon}>
              <GitBranch aria-hidden="true" />
            </span>

            <div className={styles.copy}>
              <h3 className={styles.title}>{project.title}</h3>
              <p className={styles.summary}>{project.summary}</p>
              {project.technologies.length > 0 && (
                <div className={styles.tags}>
                  {project.technologies.slice(0, MAX_TAGS).map((tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <span className={styles.cta}>
              View
              <ArrowUpRight aria-hidden="true" />
            </span>
          </a>
        ))}
      </div>
    </SectionShell>
  );
}
