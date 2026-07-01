import type { CSSProperties } from "react";
import styles from "./ContactSection.module.css";
import type { LandingContact, LandingSocialLink } from "../../landing.types";

interface ContactSectionProps {
  contact: LandingContact;
  social: LandingSocialLink[];
}

interface InfoItem {
  label: string;
  value: string;
  icon: string;
  href?: string;
}

interface PromptLine {
  tone: "muted" | "accent" | "normal" | "success";
  text: string;
}

function getSocialIcon(link: LandingSocialLink): string {
  if (link.iconClassName) return link.iconClassName;

  const source = `${link.label} ${link.href}`.toLowerCase();
  if (source.includes("github")) return "fa-brands fa-github";
  if (source.includes("linkedin")) return "fa-brands fa-linkedin-in";
  if (source.includes("telegram")) return "fa-brands fa-telegram";
  if (source.includes("x.com") || source.includes("twitter")) {
    return "fa-brands fa-x-twitter";
  }
  if (source.includes("mailto") || source.includes("email")) {
    return "fa-solid fa-envelope";
  }

  return "fa-solid fa-arrow-up-right-from-square";
}

export function ContactSection({ contact, social }: ContactSectionProps) {
  const infoItems: InfoItem[] = [
    contact.status
      ? {
          label: "Status",
          value: contact.status,
          icon: "fa-solid fa-circle-check",
        }
      : null,
    contact.email
      ? {
          label: "Email",
          value: contact.email,
          icon: "fa-solid fa-envelope",
          href: `mailto:${contact.email}`,
        }
      : null,
    contact.location
      ? {
          label: "Location",
          value: contact.location,
          icon: "fa-solid fa-location-dot",
        }
      : null,
  ].filter((item): item is InfoItem => item !== null);

  const promptLines = [
    { tone: "muted", text: "system.load_contact_brief()" },
    { tone: "accent", text: "role: Senior full-stack project collaborator" },
    {
      tone: "normal",
      text: "instruction: describe the goal, constraints, timeline, and current blocker.",
    },
    contact.email
      ? { tone: "normal", text: `preferred_channel: ${contact.email}` }
      : null,
    contact.location
      ? { tone: "normal", text: `context.location: ${contact.location}` }
      : null,
    { tone: "success", text: "output: clear next step + implementation plan" },
  ].filter((line): line is PromptLine => line !== null);

  return (
    <section
      id="contact"
      className="landing-section"
      data-anim-section="contact"
    >
      <span className="landing-eyebrow">05 / Get in Touch</span>
      <h2 className="landing-section-title">Let's work together</h2>

      <div className={styles.wrap}>
        <div className={styles.infoPanel}>
          <p className={styles.kicker}>Direct channel</p>
          <p className={styles.asideText}>
            Tell me what you are building, what is blocked, or where you need a
            backend-focused full-stack hand. I usually start with email, then
            move to the best channel for the project.
          </p>

          {infoItems.length > 0 ? (
            <div className={styles.infoList}>
              {infoItems.map((item) => {
                const content = (
                  <>
                    <span className={styles.infoIcon} aria-hidden="true">
                      <i className={item.icon} />
                    </span>
                    <span className={styles.infoCopy}>
                      <span className={styles.infoLabel}>{item.label}</span>
                      <strong>{item.value}</strong>
                    </span>
                  </>
                );

                return item.href ? (
                  <a
                    key={item.label}
                    href={item.href}
                    className={styles.infoItem}
                  >
                    {content}
                  </a>
                ) : (
                  <div key={item.label} className={styles.infoItem}>
                    {content}
                  </div>
                );
              })}
            </div>
          ) : null}

          <div className={styles.actionRow}>
            {contact.email ? (
              <a
                href={`mailto:${contact.email}`}
                className={styles.cta}
                aria-label="Email Ali Hmaidi"
              >
                {contact.ctaLabel}
                <i className="fa-solid fa-arrow-right" aria-hidden="true" />
              </a>
            ) : null}

            {social.length > 0 ? (
              <div className={styles.socials} aria-label="Social links">
                {social.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className={styles.social}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      link.href.startsWith("http") ? "noreferrer" : undefined
                    }
                    aria-label={link.label}
                    title={link.label}
                  >
                    <i className={getSocialIcon(link)} aria-hidden="true" />
                  </a>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        <div
          className={styles.promptConsole}
          data-anim-prompt-console
          aria-label="Contact prompt brief"
        >
          <div className={styles.promptBar}>
            <span className={styles.promptDots} aria-hidden="true">
              <span /> <span /> <span />
            </span>
            <span className={styles.promptTitle}>~/contact.prompt</span>
          </div>

          <div className={styles.promptBody}>
            <div className={styles.promptHead}>
              <span className={styles.promptBadge}>Prompt Brief</span>
              <span className={styles.promptStatus}>ready</span>
            </div>

            <div className={styles.promptLines}>
              {promptLines.map((line, index) => (
                <p
                  key={line.text}
                  className={`${styles.promptLine} ${styles[line.tone]}`}
                  data-anim-prompt-line
                  style={{ "--prompt-line": index } as CSSProperties}
                >
                  <span>{index === 0 ? "$" : ">"}</span>
                  <strong>{line.text}</strong>
                </p>
              ))}
            </div>

            <div className={styles.promptInput} data-anim-prompt-input>
              <span>Ask</span>
              <strong>
                Write your project goal, stack, deadline, and expected result
              </strong>
              <i className="fa-solid fa-arrow-up" aria-hidden="true" />
            </div>

            <div className={styles.promptHints}>
              {["scope", "constraints", "backend", "frontend"].map((item) => (
                <span
                  key={item}
                  data-anim-prompt-card
                  style={{ "--prompt-i": item.length } as CSSProperties}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
