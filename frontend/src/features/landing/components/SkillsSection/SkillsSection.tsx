import type { CSSProperties } from "react";
import styles from "./SkillsSection.module.css";
import type { LandingSoftwareSkill } from "../../landing.types";

interface SkillsSectionProps {
  capabilities?: string[];
  skills?: LandingSoftwareSkill[];
}

export function SkillsSection({
  capabilities = [],
  skills = [],
}: SkillsSectionProps) {
  const hasCapabilities = capabilities.length > 0;
  const hasSkills = skills.length > 0;

  return (
    <section
      id="skills"
      className={`landing-section ${styles.section}`}
      data-anim-section="skills"
    >
      <span className="landing-eyebrow">01 / Capabilities & Stack</span>
      <h2 className="landing-section-title">What I do — and what I use</h2>
      <p className="landing-section-lede">
        On the left, the work I take on day to day. On the right, the tools I
        reach for to ship it.
      </p>

      <div className={styles.wrap}>
        {hasCapabilities ? (
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Capabilities</h3>
            <ul className={styles.capabilities}>
              {capabilities.map((statement, idx) => (
                <li
                  key={statement}
                  className={styles.capability}
                  data-anim-capability
                >
                  <span className={styles.capabilityIndex}>
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <p className={styles.capabilityText}>{statement}</p>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {hasSkills ? (
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Tech Stack ({skills.length})</h3>
            <div className={styles.grid}>
              {skills.map((skill, idx) => (
                <article
                  key={skill.id}
                  className={styles.tile}
                  data-anim-skill-tile
                  style={{ "--tile-i": idx } as CSSProperties}
                  title={skill.name}
                >
                  <i
                    className={`${styles.tileIcon} ${skill.iconClassName}`}
                    aria-hidden="true"
                  />
                  <span className={styles.tileName}>{skill.name}</span>
                </article>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
