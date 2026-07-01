import styles from "./CareerJourneySection.module.css";
import type { LandingCareerStep } from "../../landing.types";

interface CareerJourneySectionProps {
  steps: LandingCareerStep[];
}

export function CareerJourneySection({ steps }: CareerJourneySectionProps) {
  if (steps.length === 0) return null;

  return (
    <section
      id="career"
      className="landing-section"
      data-anim-section="career"
    >
      <span className="landing-eyebrow">04 / Journey</span>
      <h2 className="landing-section-title">Career Journey</h2>
      <p className="landing-section-lede">
        A short timeline of focus areas and the tools I've been doubling down
        on along the way.
      </p>

      <div className={styles.timeline} data-anim-timeline>
        <div className={styles.spine} aria-hidden="true">
          <span className={styles.spineTrack} />
          <span className={styles.spineFill} data-anim-spine-fill />
        </div>
        <span
          className={`${styles.spineCap} ${styles.spineCapTop}`}
          data-anim-spine-cap
          aria-hidden="true"
        />
        <span
          className={`${styles.spineCapBottom} ${styles.spineCap}`}
          data-anim-spine-cap
          aria-hidden="true"
        />

        <ul className={styles.list}>
          {steps.map((step, idx) => {
            const side = idx % 2 === 0 ? "Left" : "Right";
            return (
              <li
                key={step.id}
                className={`${styles.item} ${
                  side === "Left" ? styles.itemLeft : styles.itemRight
                }`}
                data-anim-career-item
                data-anim-visible="false"
                data-anim-active="false"
              >
                <span
                  className={styles.dot}
                  data-anim-career-dot
                  aria-hidden="true"
                />
                <article className={styles.card} data-anim-career-card>
                  <span className={styles.period} data-anim-career-detail>
                    {step.period}
                  </span>
                  <h3 className={styles.role} data-anim-career-detail>
                    {step.role}
                  </h3>
                  <p className={styles.org} data-anim-career-detail>
                    {step.org}
                  </p>
                  {step.body ? (
                    <p className={styles.body} data-anim-career-detail>
                      {step.body}
                    </p>
                  ) : null}
                  {step.tech.length > 0 ? (
                    <div className={styles.tech}>
                      {step.tech.map((t) => (
                        <span key={t} data-anim-career-chip>
                          {t}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
