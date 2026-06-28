import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { ProjectForm } from "../components/project-form/ProjectForm";
import { useCreateProjectForm } from "../hooks/useCreateProjectForm";
import styles from "./AddProjectPage.module.css";

export function AddProjectPage() {
  const projectForm = useCreateProjectForm();

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <Link to="/admin/projects" className={styles.backLink}>
          <ArrowLeft aria-hidden="true" />
          Projects
        </Link>
        <p className={styles.eyebrow}>New project</p>
        <h1>Add project</h1>
        <p className={styles.intro}>
          Add the content, links, and publishing details for a portfolio
          project.
        </p>
      </header>

      <ProjectForm
        {...projectForm}
        submitLabel="Create project"
        submittingLabel="Creating project"
      />
    </section>
  );
}
