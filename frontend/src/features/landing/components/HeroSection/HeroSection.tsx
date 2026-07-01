import { StatusBadge } from "./StatusBadge";
import { HeroActions } from "./HeroActions";
import { HeroBackdrop } from "./HeroBackdrop";
import styles from "./HeroSection.module.css";
import type { LandingHero } from "../../landing.types";

interface HeroSectionProps {
  hero: LandingHero;
}

export function HeroSection({ hero }: HeroSectionProps) {
  const [firstName, ...rest] = hero.name.split(" ");
  const lastName = rest.join(" ");

  // Up to three tech names power the floating glass cards.
  const cardTech = hero.techStack.slice(0, 3);

  return (
    <section id="hero" className={styles.section} data-anim-section="hero">
      <HeroBackdrop />
      <div
        className={styles.cursorGlow}
        data-hero-cursor-glow
        aria-hidden="true"
      />

      <div className={styles.inner}>
        <div className={styles.content}>
          <StatusBadge label={hero.badge} />

          <h1 className={styles.heroName} data-anim="hero-name">
            {firstName}
            {lastName ? (
              <>
                {" "}
                <span className={styles.accent}>{lastName}</span>
              </>
            ) : null}
          </h1>

          {hero.title ? (
            <p className={styles.heroRole} data-anim="hero-role">
              {hero.title}
            </p>
          ) : null}

          <p className={styles.heroSummary} data-anim="hero-title">
            {hero.summary}
          </p>

          {hero.description ? (
            <p className={styles.heroDescription} data-anim="hero-description">
              {hero.description}
            </p>
          ) : null}

          <HeroActions
            primary={hero.primaryCta}
            secondary={hero.secondaryCta}
            resume={hero.resumeCta}
          />
        </div>

        <div className={styles.glassCards} aria-hidden="true">
          <article
            className={`${styles.card} ${styles.cardStatus}`}
            data-anim="floating-panel"
            data-hero-card
          >
            <span className={styles.cardDot} />
            <div className={styles.cardBody}>
              <span className={styles.cardLabel}>{hero.badge}</span>
              <strong className={styles.cardValue}>Open to work</strong>
            </div>
          </article>

          <article
            className={`${styles.card} ${styles.cardStack}`}
            data-anim="floating-panel"
            data-hero-card
          >
            <span className={styles.cardKicker}>Core stack</span>
            <div className={styles.cardChips}>
              {cardTech.map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>
          </article>

          <article
            className={`${styles.card} ${styles.cardMeta}`}
            data-anim="floating-panel"
            data-hero-card
          >
            <i className="fa-solid fa-terminal" aria-hidden="true" />
            <span className={styles.cardMetaText}>identity.online</span>
          </article>
        </div>
      </div>

      <span className={styles.scrollCue} aria-hidden="true">
        <span className={styles.scrollCueDot} />
        Scroll
      </span>
    </section>
  );
}
