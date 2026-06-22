import { FolderKanban } from "lucide-react";
import { resolveApiError } from "@/shared/lib/api-error";
import { ErrorState } from "@/shared/ui";
import { ProjectListItem } from "../components/project-list-item/ProjectListItem";
import { useAdminProjects } from "../hooks/useAdminProjects";
import styles from "./AdminProjectsPage.module.css";

export function AdminProjectsPage() {
  const projectsQuery = useAdminProjects();
  const projects = projectsQuery.data ?? [];
  const publishedCount = projects.filter(
    (project) => project.isPublished,
  ).length;

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Content</p>
          <h1>Projects</h1>
          <p className={styles.intro}>
            Review the projects displayed across your portfolio workspace.
          </p>
        </div>

        {!projectsQuery.isPending && !projectsQuery.isError && (
          <dl className={styles.summary} aria-label="Project summary">
            <div>
              <dt>Total</dt>
              <dd>{projects.length}</dd>
            </div>
            <div>
              <dt>Published</dt>
              <dd>{publishedCount}</dd>
            </div>
          </dl>
        )}
      </header>

      {projectsQuery.isPending && <ProjectsLoading />}

      {projectsQuery.isError && (
        <div className={styles.feedbackPanel}>
          <ErrorState
            compact
            title="Projects could not be loaded"
            description={resolveApiError(projectsQuery.error)}
            actionLabel="Try again"
            onAction={() => void projectsQuery.refetch()}
          />
        </div>
      )}

      {!projectsQuery.isPending &&
        !projectsQuery.isError &&
        projects.length === 0 && (
          <div className={styles.emptyState}>
            <span className={styles.emptyIcon}>
              <FolderKanban aria-hidden="true" />
            </span>
            <h2>No projects yet</h2>
            <p>
              Your portfolio projects will appear here after the first one is
              created.
            </p>
          </div>
        )}

      {!projectsQuery.isPending &&
        !projectsQuery.isError &&
        projects.length > 0 && (
          <section
            className={styles.listSection}
            aria-labelledby="project-list-title"
          >
            <header className={styles.listHeader}>
              <div>
                <h2 id="project-list-title">Portfolio projects</h2>
                <p>Ordered exactly as they appear in the portfolio.</p>
              </div>
              <span>{projects.length} items</span>
            </header>

            <div className={styles.columnLabels} aria-hidden="true">
              <span>Order</span>
              <span>Project</span>
              <span>Technology</span>
              <span>Status</span>
              <span>Links</span>
            </div>

            <div className={styles.projectList}>
              {projects.map((project) => (
                <ProjectListItem key={project.id} project={project} />
              ))}
            </div>
          </section>
        )}
    </section>
  );
}

function ProjectsLoading() {
  return (
    <div className={styles.loading} role="status" aria-label="Loading projects">
      <div className={styles.loadingHeader} />
      {[0, 1, 2].map((item) => (
        <div className={styles.loadingRow} key={item}>
          <span />
          <div>
            <strong />
            <small />
          </div>
          <i />
          <i />
        </div>
      ))}
    </div>
  );
}
