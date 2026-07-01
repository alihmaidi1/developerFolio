import { useEffect, useState } from "react";
import styles from "./LandingHeader.module.css";

const NAV_LINKS = [
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Career", href: "#career" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export function LandingHeader() {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState("");

  // Scroll-spy: the active section is the last one whose top has scrolled
  // past a line just below the fixed header. Pure geometry — reliable across
  // viewport sizes and smooth-scroll libraries.
  useEffect(() => {
    const ids = NAV_LINKS.map((link) => link.href.slice(1));
    const OFFSET = 120; // fixed header height + breathing room

    const computeActive = () => {
      let current = "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top - OFFSET <= 0) {
          current = id;
        }
      }
      setActiveId(current);
    };

    computeActive();
    window.addEventListener("scroll", computeActive, { passive: true });
    window.addEventListener("resize", computeActive);
    return () => {
      window.removeEventListener("scroll", computeActive);
      window.removeEventListener("resize", computeActive);
    };
  }, []);

  const close = () => setOpen(false);

  const isActive = (href: string) => activeId === href.slice(1);

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
            <a
              key={link.href}
              href={link.href}
              className={isActive(link.href) ? styles.navActive : undefined}
              aria-current={isActive(link.href) ? "true" : undefined}
            >
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
            <a
              key={link.href}
              href={link.href}
              onClick={close}
              className={isActive(link.href) ? styles.sheetActive : undefined}
              aria-current={isActive(link.href) ? "true" : undefined}
            >
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
