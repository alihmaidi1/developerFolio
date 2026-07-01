import styles from "./HeroSection.module.css";
import type { LandingHero } from "../../landing.types";

interface HeroActionsProps {
  primary: LandingHero["primaryCta"];
  secondary: LandingHero["secondaryCta"];
}

export function HeroActions({ primary, secondary }: HeroActionsProps) {
  return (
    <div className={styles.actions} data-anim="hero-actions">
      <a href={primary.href} className={`${styles.btn} ${styles.btnPrimary}`}>
        {primary.label}
        <span className={styles.btnArrow} aria-hidden="true">
          →
        </span>
      </a>
      <a
        href={secondary.href}
        className={`${styles.btn} ${styles.btnSecondary}`}
      >
        {secondary.label}
      </a>
    </div>
  );
}
