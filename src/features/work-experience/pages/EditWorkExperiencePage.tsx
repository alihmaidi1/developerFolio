import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { resolveApiError } from "@/shared/lib/api-error";
import { ErrorState } from "@/shared/ui";
import { WorkExperienceForm } from "../components/work-experience-form/WorkExperienceForm";
import { useWorkExperienceDetails } from "../hooks/useWorkExperienceDetails";
import { useUpdateWorkExperienceForm } from "../hooks/useUpdateWorkExperienceForm";
import type { AdminWorkExperience } from "../model/work-experience.types";
import styles from "./EditWorkExperiencePage.module.css";

export function EditWorkExperiencePage() {
  const { workExperienceId = "" } = useParams<{ workExperienceId: string }>();
  const entryQuery = useWorkExperienceDetails(workExperienceId);

  if (!workExperienceId) {
    return (
      <ErrorState
        title="Work experience entry is unavailable"
        description="The entry identifier is missing from this page."
        href="/admin/work-experience"
        hrefLabel="Back to work experience"
      />
    );
  }

  if (entryQuery.isPending) {
    return <EditWorkExperienceLoading />;
  }

  if (entryQuery.isError) {
    return (
      <ErrorState
        title="Work experience entry could not be loaded"
        description={resolveApiError(entryQuery.error)}
        actionLabel="Try again"
        onAction={() => void entryQuery.refetch()}
        href="/admin/work-experience"
        hrefLabel="Back to work experience"
      />
    );
  }

  return <EditWorkExperienceEditor entry={entryQuery.data} />;
}

function EditWorkExperienceEditor({ entry }: { entry: AdminWorkExperience }) {
  const workExperienceForm = useUpdateWorkExperienceForm(entry);

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <Link to="/admin/work-experience" className={styles.backLink}>
          <ArrowLeft aria-hidden="true" />
          Work experience
        </Link>
        <p className={styles.eyebrow}>Edit entry</p>
        <h1>{entry.company}</h1>
        <p className={styles.intro}>
          Update the role, logo, and highlights. Display order remains
          unchanged.
        </p>
      </header>

      <WorkExperienceForm
        {...workExperienceForm}
        submitLabel="Save changes"
        submittingLabel="Saving changes"
      />
    </section>
  );
}

function EditWorkExperienceLoading() {
  return (
    <div
      className={styles.loading}
      role="status"
      aria-label="Loading work experience entry"
    >
      <span />
      <strong />
      <small />
      <div />
    </div>
  );
}
