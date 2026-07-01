import { useEffect, useRef, useState } from "react";
import styles from "./ContactSection.module.css";
import type {
  LandingContact,
  LandingSocialLink,
} from "../../landing.types";

interface ContactSectionProps {
  contact: LandingContact;
  social: LandingSocialLink[];
}

export function ContactSection({ contact, social }: ContactSectionProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  // Trigger terminal line stagger when the section scrolls into view.
  useEffect(() => {
    const node = wrapRef.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const lines = [
    { prompt: ">", text: "contact.init()" },
    contact.status ? { prompt: ">", text: `status: ${contact.status}` } : null,
    contact.email ? { prompt: ">", text: `email: ${contact.email}` } : null,
    contact.location
      ? { prompt: ">", text: `location: ${contact.location}` }
      : null,
    { prompt: ">", text: "ready: true" },
  ].filter((line): line is { prompt: string; text: string } => line !== null);

  return (
    <section
      id="contact"
      className="landing-section"
      data-anim-section="contact"
    >
      <span className="landing-eyebrow">05 / Get in Touch</span>
      <h2 className="landing-section-title">Let's work together</h2>

      <div className={styles.wrap} ref={wrapRef}>
        <div className={styles.terminal}>
          <div className={styles.terminalBar}>
            <span className={styles.terminalDots}>
              <span /> <span /> <span />
            </span>
            <span className={styles.terminalTitle}>~/contact.sh</span>
          </div>
          <div className={styles.terminalBody}>
            {lines.map((line, i) => (
              <div
                key={line.text}
                className={styles.line}
                data-shown={shown ? "true" : "false"}
                style={{ animationDelay: `${i * 110}ms` }}
              >
                <span>{line.prompt}</span>
                <strong>{line.text}</strong>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.aside}>
          <p className={styles.asideText}>
            Open to backend, full-stack, and architecture-focused roles. If
            you'd like to talk about a project or a position, the fastest path
            is email.
          </p>

          <a
            href={`mailto:${contact.email}`}
            className={styles.cta}
            aria-label="Email Ali Hmaidi"
          >
            {contact.ctaLabel}
            <span aria-hidden="true">→</span>
          </a>

          {social.length > 0 ? (
            <div className={styles.socials}>
              {social.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={styles.social}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                >
                  {link.label}
                </a>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
