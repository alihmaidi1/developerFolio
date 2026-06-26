import { ErrorState } from "@/shared/ui";
import Loading from "@/shared/ui/loading/Loading";
import { useLandingSkills } from "../hooks/useLandingData";
import SectionShell from "../components/section-shell/SectionShell";
import sectionStyles from "../components/section-shell/SectionShell.module.css";
import styles from "./SkillsSection.module.css";

export function SkillsSection() {
  const skillsQuery = useLandingSkills();

  if (skillsQuery.isError) {
    return (
      <SectionShell id="skills" eyebrow="Stack" title="Skills">
        <div className={sectionStyles.feedback}>
          <ErrorState
            compact
            title="Skills are temporarily unavailable."
            description="Retry without reloading the page."
            actionLabel="Retry"
            onAction={() => void skillsQuery.refetch()}
          />
        </div>
      </SectionShell>
    );
  }

  if (skillsQuery.isPending) {
    return (
      <SectionShell id="skills" eyebrow="Stack" title="Skills">
        <div className={sectionStyles.feedback}>
          <Loading />
        </div>
      </SectionShell>
    );
  }

  const { statements, softwareSkills } = skillsQuery.data ?? {
    statements: [],
    softwareSkills: [],
  };

  if (statements.length === 0 && softwareSkills.length === 0) {
    return null;
  }

  return (
    <SectionShell
      id="skills"
      eyebrow="Stack"
      title="Skills"
      subtitle="What I build and the tools I trust most along the way."
    >
      <div className={styles.split}>
        {statements.length > 0 && (
          <div className={styles.statements}>
            {statements.map((statement, index) => (
              <div key={statement.id} className={styles.statement}>
                <span className={styles.statementMark}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className={styles.statementText}>{statement.text}</p>
              </div>
            ))}
          </div>
        )}

        {softwareSkills.length > 0 && (
          <div className={styles.stack}>
            {softwareSkills.map((skill) => (
              <div key={skill.id} className={styles.skill}>
                <i className={skill.iconClassName} aria-hidden="true" />
                <span className={styles.skillName}>{skill.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </SectionShell>
  );
}
