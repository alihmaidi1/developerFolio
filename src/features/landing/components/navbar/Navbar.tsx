import { useEffect, useState } from "react";
import styles from "./Navbar.module.css";

interface NavbarProps {
  brand: string;
  contactHref: string;
}

const SECTIONS: { id: string; label: string }[] = [
  { id: "projects", label: "Projects" },
  { id: "opensource", label: "Open Source" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

export function Navbar({ brand, contactHref }: NavbarProps) {
  const [active, setActive] = useState<string>("hero");

  // Active link tracking via IntersectionObserver
  useEffect(() => {
    const ids = ["hero", ...SECTIONS.map((s) => s.id)];
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => node !== null);

    if (elements.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        // pick the entry with the largest intersection ratio
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          setActive(visible[0].target.id);
        }
      },
      { threshold: [0.25, 0.5, 0.75], rootMargin: "-30% 0px -50% 0px" },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav className={styles.bar} aria-label="Landing navigation">
      <div className={styles.inner}>
        <button
          type="button"
          className={styles.brand}
          onClick={() => scrollToId("hero")}
        >
          <span className={styles.brandTag}>{"<"}</span>
          {brand}
          <span className={styles.brandTag}>{"/>"}</span>
        </button>

        <div className={styles.links}>
          {SECTIONS.map((section) => (
            <button
              key={section.id}
              type="button"
              className={`${styles.link} ${active === section.id ? styles.active : ""}`}
              onClick={() => scrollToId(section.id)}
            >
              {section.label}
            </button>
          ))}
        </div>

        <a className={styles.cta} href={contactHref}>
          Hire me
        </a>
      </div>
    </nav>
  );
}
