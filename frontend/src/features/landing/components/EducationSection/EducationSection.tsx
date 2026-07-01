import styles from "./EducationSection.module.css";
import type { LandingEducation } from "../../landing.types";

interface EducationSectionProps {
  education: LandingEducation[];
}

export function EducationSection({ education }: EducationSectionProps) {
  if (education.length === 0) return null;

  return (
    <section
      id="education"
      className="landing-section"
      data-anim-section="education"
    >
      <span className="landing-eyebrow">05 / Education</span>
      <h2 className="landing-section-title">Academic Background</h2>
      <p className="landing-section-lede">
        The foundations and formal training that shaped how I think about
        software, systems, and continuous improvement.
      </p>

      <div className={styles.grid}>
        {education.map((edu) => (
          <article
            key={edu.id}
            className={styles.card}
            data-anim-education-card
          >
            <div className={styles.cardHead}>
              <span className={styles.iconWrap} aria-hidden="true">
                <i className="fas fa-graduation-cap" />
              </span>
              <span className={styles.period}>{edu.period}</span>
            </div>

            <h3 className={styles.degree}>{edu.degree}</h3>
            <p className={styles.school}>{edu.school}</p>

            {edu.description ? (
              <p className={styles.body}>{edu.description}</p>
            ) : null}

            {edu.bullets.length > 0 ? (
              <ul className={styles.bullets}>
                {edu.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}
