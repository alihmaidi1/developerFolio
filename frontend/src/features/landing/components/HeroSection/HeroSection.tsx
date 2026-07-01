import { StatusBadge } from "./StatusBadge";
import { HeroActions } from "./HeroActions";
import { TechChips } from "./TechChips";
import { LandingScene } from "../LandingScene/LandingScene";
import styles from "./HeroSection.module.css";
import type { LandingHero } from "../../landing.types";

interface HeroSectionProps {
  hero: LandingHero;
}

export function HeroSection({ hero }: HeroSectionProps) {
  const [firstName, ...rest] = hero.name.split(" ");
  const lastName = rest.join(" ");

  return (
    <section id="hero" className={styles.section} data-anim-section="hero">
      <div className={styles.intro}>
        <StatusBadge label={hero.badge} />

        <h1 className={styles.heroName} data-anim="hero-name">
          Hi, I'm {firstName}{" "}
          {lastName ? <span className={styles.accent}>{lastName}</span> : null}
        </h1>

        {hero.title ? (
          <p className={styles.heroRole} data-anim="hero-role">
            {hero.title}
          </p>
        ) : null}

        <p className={styles.heroTitle} data-anim="hero-title">
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

        <TechChips items={hero.techStack} />
      </div>

      <div className={styles.sceneWrap}>
        <span className={styles.sceneLabel}>identity.online</span>
        <LandingScene />
        <span className={styles.sceneCornerBR} aria-hidden="true" />
      </div>
    </section>
  );
}
