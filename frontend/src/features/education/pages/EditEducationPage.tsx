import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { resolveApiError } from "@/shared/lib/api-error";
import { ErrorState } from "@/shared/ui";
import { EducationForm } from "../components/education-form/EducationForm";
import { useEducationDetails } from "../hooks/useEducationDetails";
import { useUpdateEducationForm } from "../hooks/useUpdateEducationForm";
import type { AdminEducation } from "../model/education.types";
import styles from "./EditEducationPage.module.css";

export function EditEducationPage() {
  const { educationId = "" } = useParams<{ educationId: string }>();
  const entryQuery = useEducationDetails(educationId);

  if (!educationId) {
    return (
      <ErrorState
        title="Education entry is unavailable"
        description="The entry identifier is missing from this page."
        href="/admin/education"
        hrefLabel="Back to education"
      />
    );
  }

  if (entryQuery.isPending) {
    return <EditEducationLoading />;
  }

  if (entryQuery.isError) {
    return (
      <ErrorState
        title="Education entry could not be loaded"
        description={resolveApiError(entryQuery.error)}
        actionLabel="Try again"
        onAction={() => void entryQuery.refetch()}
        href="/admin/education"
        hrefLabel="Back to education"
      />
    );
  }

  return <EditEducationEditor entry={entryQuery.data} />;
}

function EditEducationEditor({ entry }: { entry: AdminEducation }) {
  const educationForm = useUpdateEducationForm(entry);

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <Link to="/admin/education" className={styles.backLink}>
          <ArrowLeft aria-hidden="true" />
          Education
        </Link>
        <p className={styles.eyebrow}>Edit entry</p>
        <h1>{entry.schoolName}</h1>
        <p className={styles.intro}>
          Update the school details, logo, and highlights. Display order remains
          unchanged.
        </p>
      </header>

      <EducationForm
        {...educationForm}
        submitLabel="Save changes"
        submittingLabel="Saving changes"
      />
    </section>
  );
}

function EditEducationLoading() {
  return (
    <div
      className={styles.loading}
      role="status"
      aria-label="Loading education entry"
    >
      <span />
      <strong />
      <small />
      <div />
    </div>
  );
}
