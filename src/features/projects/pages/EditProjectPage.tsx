import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { resolveApiError } from "@/shared/lib/api-error";
import { ErrorState } from "@/shared/ui";
import type { AdminProject } from "../model/project.types";
import { ProjectForm } from "../components/project-form/ProjectForm";
import { useProjectDetails } from "../hooks/useProjectDetails";
import { useUpdateProjectForm } from "../hooks/useUpdateProjectForm";
import styles from "./EditProjectPage.module.css";

export function EditProjectPage() {
  const { projectId = "" } = useParams<{ projectId: string }>();
  const projectQuery = useProjectDetails(projectId);

  if (!projectId) {
    return (
      <ErrorState
        title="Project is unavailable"
        description="The project identifier is missing from this page."
        href="/admin/projects"
        hrefLabel="Back to projects"
      />
    );
  }

  if (projectQuery.isPending) {
    return <EditProjectLoading />;
  }

  if (projectQuery.isError) {
    return (
      <ErrorState
        title="Project could not be loaded"
        description={resolveApiError(projectQuery.error)}
        actionLabel="Try again"
        onAction={() => void projectQuery.refetch()}
        href="/admin/projects"
        hrefLabel="Back to projects"
      />
    );
  }

  return <EditProjectEditor project={projectQuery.data} />;
}

function EditProjectEditor({ project }: { project: AdminProject }) {
  const projectForm = useUpdateProjectForm(project);

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <Link to="/admin/projects" className={styles.backLink}>
          <ArrowLeft aria-hidden="true" />
          Projects
        </Link>
        <p className={styles.eyebrow}>Edit project</p>
        <h1>{project.title}</h1>
        <p className={styles.intro}>
          Update the project content and publishing details. Display order
          remains unchanged.
        </p>
      </header>

      <ProjectForm
        {...projectForm}
        submitLabel="Save changes"
        submittingLabel="Saving changes"
      />
    </section>
  );
}

function EditProjectLoading() {
  return (
    <div className={styles.loading} role="status" aria-label="Loading project">
      <span />
      <strong />
      <small />
      <div />
    </div>
  );
}
