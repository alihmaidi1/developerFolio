import { Mail, MapPin, Phone, Send } from "lucide-react";
import type { LandingContact, LandingSocialLink } from "../api/landing.api";
import SectionShell from "../components/section-shell/SectionShell";
import styles from "./ContactSection.module.css";

interface ContactSectionProps {
  contact: LandingContact;
  socialLinks: LandingSocialLink[];
}

export function ContactSection({ contact, socialLinks }: ContactSectionProps) {
  return (
    <SectionShell id="contact" eyebrow="Let's talk" title={contact.title}>
      <div className={styles.card}>
        <p className={styles.subtitle}>{contact.subtitle}</p>

        <div className={styles.details}>
          {contact.email && (
            <a href={`mailto:${contact.email}`}>
              <Mail aria-hidden="true" />
              {contact.email}
            </a>
          )}
          {contact.phone && (
            <a href={`tel:${contact.phone}`}>
              <Phone aria-hidden="true" />
              {contact.phone}
            </a>
          )}
          {contact.address && (
            <span>
              <MapPin aria-hidden="true" />
              {contact.address}
            </span>
          )}
        </div>

        {contact.email && (
          <a className={styles.primary} href={`mailto:${contact.email}`}>
            <Send aria-hidden="true" size={18} />
            Email me
          </a>
        )}

        {socialLinks.length > 0 && (
          <div className={styles.socials}>
            {socialLinks.map((link) => (
              <a
                key={link.id}
                className={styles.social}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                aria-label={link.name}
                title={link.name}
              >
                <i className={link.iconClassName} aria-hidden="true" />
              </a>
            ))}
          </div>
        )}
      </div>
    </SectionShell>
  );
}
