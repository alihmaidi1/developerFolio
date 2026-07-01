import { useState } from "react";
import styles from "./LandingHeader.module.css";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Career", href: "#career" },
];

export function LandingHeader() {
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  return (
    <header className={styles.header} data-landing-header>
      <div className={styles.inner}>
        <a href="#hero" className={styles.logo} aria-label="Ali Hmaidi home">
          <span className={styles.logoMark}>AH</span>
          <span className={styles.logoText}>
            ali<strong>.dev</strong>
          </span>
        </a>

        <nav className={styles.nav} aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <a href="#contact" className={styles.cta}>
          Hire Me
        </a>

        <button
          type="button"
          className={styles.menuToggle}
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
        >
          <span aria-hidden="true" />
        </button>
      </div>

      <div className={`${styles.sheet} ${open ? styles.sheetOpen : ""}`}>
        <div className={styles.sheetInner}>
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={close}>
              {link.label}
            </a>
          ))}
          <a href="#contact" className={styles.sheetCta} onClick={close}>
            Hire Me
          </a>
        </div>
      </div>
    </header>
  );
}
