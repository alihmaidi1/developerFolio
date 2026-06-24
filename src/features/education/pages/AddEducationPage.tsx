import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { EducationForm } from "../components/education-form/EducationForm";
import { useCreateEducationForm } from "../hooks/useCreateEducationForm";
import styles from "./AddEducationPage.module.css";

export function AddEducationPage() {
  const educationForm = useCreateEducationForm();

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <Link to="/admin/education" className={styles.backLink}>
          <ArrowLeft aria-hidden="true" />
          Education
        </Link>
        <p className={styles.eyebrow}>New entry</p>
        <h1>Add education</h1>
        <p className={styles.intro}>
          Add a school, degree, and timeline to display on the public portfolio.
        </p>
      </header>

      <EducationForm
        {...educationForm}
        submitLabel="Create entry"
        submittingLabel="Creating entry"
      />
    </section>
  );
}
