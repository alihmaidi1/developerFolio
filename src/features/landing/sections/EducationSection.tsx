import { resolveAssetUrl } from "@/shared/lib/asset-url";
import { ErrorState } from "@/shared/ui";
import Loading from "@/shared/ui/loading/Loading";
import { useLandingEducation } from "../hooks/useLandingData";
import SectionShell from "../components/section-shell/SectionShell";
import sectionStyles from "../components/section-shell/SectionShell.module.css";
import styles from "./Timeline.module.css";

export function EducationSection() {
  const educationQuery = useLandingEducation();

  if (educationQuery.isError) {
    return (
      <SectionShell id="education" eyebrow="Background" title="Education">
        <div className={sectionStyles.feedback}>
          <ErrorState
            compact
            title="Education list unavailable."
            description="Retry without reloading the page."
            actionLabel="Retry"
            onAction={() => void educationQuery.refetch()}
          />
        </div>
      </SectionShell>
    );
  }

  if (educationQuery.isPending) {
    return (
      <SectionShell id="education" eyebrow="Background" title="Education">
        <div className={sectionStyles.feedback}>
          <Loading />
        </div>
      </SectionShell>
    );
  }

  const entries = educationQuery.data ?? [];
  if (entries.length === 0) {
    return null;
  }

  return (
    <SectionShell
      id="education"
      eyebrow="Background"
      title="Education"
      subtitle="Where I trained and the foundations I built."
    >
      <div className={styles.timeline}>
        {entries.map((entry) => {
          const logo = resolveAssetUrl(entry.logoUrl);
          return (
            <div key={entry.id} className={styles.entry}>
              <span className={styles.node} aria-hidden="true" />
              <div className={styles.card}>
                <div className={styles.head}>
                  <div className={styles.logo}>
                    {logo ? (
                      <img src={logo} alt={`${entry.schoolName} logo`} />
                    ) : (
                      <span className={styles.logoPlaceholder}>
                        {entry.schoolName.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div className={styles.headline}>
                    <h3 className={styles.title}>{entry.schoolName}</h3>
                    <p className={styles.subtitle}>{entry.degree}</p>
                  </div>
                  <span className={styles.meta}>{entry.duration}</span>
                </div>

                {entry.description && (
                  <p className={styles.body}>{entry.description}</p>
                )}

                {entry.descriptionBullets.length > 0 && (
                  <ul className={styles.bullets}>
                    {entry.descriptionBullets.map((bullet, index) => (
                      <li key={index}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </SectionShell>
  );
}
