import styles from "./HeroSection.module.css";
import type { LandingHero } from "../../landing.types";

interface HeroActionsProps {
  primary: LandingHero["primaryCta"];
  secondary: LandingHero["secondaryCta"];
  resume?: LandingHero["resumeCta"];
}

export function HeroActions({ primary, secondary, resume }: HeroActionsProps) {
  return (
    <div className={styles.actions} data-anim="hero-actions">
      <a
        href={primary.href}
        className={`${styles.btn} ${styles.btnPrimary}`}
        data-hero-magnetic
      >
        {primary.label}
        <span className={styles.btnArrow} aria-hidden="true">
          →
        </span>
      </a>
      <a
        href={secondary.href}
        className={`${styles.btn} ${styles.btnSecondary}`}
        data-hero-magnetic
      >
        {secondary.label}
      </a>
      {resume ? (
        <a
          href={resume.href}
          className={`${styles.btn} ${styles.btnResume}`}
          download
          data-hero-magnetic
        >
          <i className="fa-solid fa-download" aria-hidden="true" />
          {resume.label}
        </a>
      ) : null}
    </div>
  );
}
