import { resolveAssetUrl } from "@/shared/lib/asset-url";
import { ErrorState } from "@/shared/ui";
import Loading from "@/shared/ui/loading/Loading";
import { useLandingExperience } from "../hooks/useLandingData";
import SectionShell from "../components/section-shell/SectionShell";
import sectionStyles from "../components/section-shell/SectionShell.module.css";
import styles from "./Timeline.module.css";

export function ExperienceSection() {
  const experienceQuery = useLandingExperience();

  if (experienceQuery.isError) {
    return (
      <SectionShell id="experience" eyebrow="Career" title="Experience">
        <div className={sectionStyles.feedback}>
          <ErrorState
            compact
            title="Experience list unavailable."
            description="Retry without reloading the page."
            actionLabel="Retry"
            onAction={() => void experienceQuery.refetch()}
          />
        </div>
      </SectionShell>
    );
  }

  if (experienceQuery.isPending) {
    return (
      <SectionShell id="experience" eyebrow="Career" title="Experience">
        <div className={sectionStyles.feedback}>
          <Loading />
        </div>
      </SectionShell>
    );
  }

  const entries = experienceQuery.data ?? [];
  if (entries.length === 0) {
    return null;
  }

  return (
    <SectionShell
      id="experience"
      eyebrow="Career"
      title="Experience"
      subtitle="The teams I worked with and the impact I delivered."
    >
      <div className={styles.timeline}>
        {entries.map((entry) => {
          const logo = resolveAssetUrl(entry.companyLogoUrl);
          return (
            <div key={entry.id} className={styles.entry}>
              <span className={styles.node} aria-hidden="true" />
              <div className={styles.card}>
                <div className={styles.head}>
                  <div className={styles.logo}>
                    {logo ? (
                      <img src={logo} alt={`${entry.company} logo`} />
                    ) : (
                      <span className={styles.logoPlaceholder}>
                        {entry.company.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div className={styles.headline}>
                    <h3 className={styles.title}>{entry.role}</h3>
                    <p className={styles.subtitle}>{entry.company}</p>
                  </div>
                  <span className={styles.meta}>{entry.date}</span>
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
