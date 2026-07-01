import styles from "./AboutSection.module.css";
import type { LandingAbout } from "../../landing.types";

interface AboutSectionProps {
  about: LandingAbout;
}

function parseStatValue(raw: string): { num: string; suffix: string } {
  const m = raw.match(/^(\d+(?:\.\d+)?)(.*)/);
  return m ? { num: m[1], suffix: m[2] } : { num: "0", suffix: raw };
}

export function AboutSection({ about }: AboutSectionProps) {
  return (
    <section
      id="about"
      className="landing-section"
      data-anim-section="about"
    >
      <span className="landing-eyebrow">01 / Profile</span>
      <h2 className="landing-section-title">{about.title}</h2>

      <div className={styles.grid}>
        <p className={styles.body} data-anim-fade>
          {about.body}
        </p>

        <div className={styles.stats}>
          {about.stats.map((stat) => {
            const { num, suffix } = parseStatValue(stat.value);
            return (
              <article
                key={stat.label}
                className={styles.statCard}
                data-anim-fade
              >
                <div
                  className={styles.statValue}
                  data-anim-stat-value
                  data-stat-target={num}
                  data-stat-suffix={suffix}
                >
                  {stat.value}
                </div>
                <div className={styles.statLabel}>{stat.label}</div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
