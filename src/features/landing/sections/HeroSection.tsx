import { ArrowRight, Download } from "lucide-react";
import type { LandingGreeting } from "../api/landing.api";
import { Hero3D } from "../components/hero-3d/Hero3D";
import styles from "./HeroSection.module.css";

const HERO_ROLE = "Full-Stack Developer";

interface HeroSectionProps {
  greeting: LandingGreeting;
}

export function HeroSection({ greeting }: HeroSectionProps) {
  return (
    <section id="hero" className={styles.hero} aria-label="Introduction">
      <div className={styles.bg} aria-hidden="true">
        <span className={`${styles.orb} ${styles.orbOne}`} />
        <span className={`${styles.orb} ${styles.orbTwo}`} />
        <div className={styles.grid} />
      </div>

      <div className={styles.inner}>
        <div className={styles.copy}>
          <span className={styles.badge}>
            <span className={styles.badgeDot} aria-hidden="true" />
            Available for new projects
          </span>

          <h1 className={styles.title}>
            <span className={styles.titleAccent}>{greeting.title}</span>
          </h1>

          <p className={styles.subtitle}>{greeting.subTitle}</p>

          <div className={styles.actions}>
            <a className={styles.primary} href="#contact">
              Get in touch
              <ArrowRight aria-hidden="true" size={18} />
            </a>
            {greeting.resumeUrl && (
              <a
                className={styles.secondary}
                href={greeting.resumeUrl}
                target="_blank"
                rel="noreferrer"
              >
                <Download aria-hidden="true" size={18} />
                Download resume
              </a>
            )}
          </div>
        </div>

        <div className={styles.heroMedia}>
          <Hero3D
            username={greeting.username}
            role={HERO_ROLE}
            available={greeting.displayGreeting}
          />
        </div>
      </div>
    </section>
  );
}
