import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { WorkExperienceForm } from "../components/work-experience-form/WorkExperienceForm";
import { useCreateWorkExperienceForm } from "../hooks/useCreateWorkExperienceForm";
import styles from "./AddWorkExperiencePage.module.css";

export function AddWorkExperiencePage() {
  const workExperienceForm = useCreateWorkExperienceForm();

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <Link to="/admin/work-experience" className={styles.backLink}>
          <ArrowLeft aria-hidden="true" />
          Work experience
        </Link>
        <p className={styles.eyebrow}>New entry</p>
        <h1>Add work experience</h1>
        <p className={styles.intro}>
          Add a role, company, and timeline to display on the public portfolio.
        </p>
      </header>

      <WorkExperienceForm
        {...workExperienceForm}
        submitLabel="Create entry"
        submittingLabel="Creating entry"
      />
    </section>
  );
}
