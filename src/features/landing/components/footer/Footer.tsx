import type { LandingSocialLink } from "../../api/landing.api";
import styles from "./Footer.module.css";

interface FooterProps {
  brand: string;
  socials: LandingSocialLink[];
}

export function Footer({ brand, socials }: FooterProps) {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.watermark}>
          © {year} <strong>{brand}</strong> · Crafted with care
        </p>

        {socials.length > 0 && (
          <div className={styles.socials}>
            {socials.map((social) => (
              <a
                key={social.id}
                className={styles.social}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                aria-label={social.name}
                title={social.name}
              >
                <i className={social.iconClassName} aria-hidden="true" />
              </a>
            ))}
          </div>
        )}
      </div>
    </footer>
  );
}
