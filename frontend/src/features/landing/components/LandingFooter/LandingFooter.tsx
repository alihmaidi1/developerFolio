import styles from "./LandingFooter.module.css";

export function LandingFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <strong>ali.dev</strong> — Built with React, Three.js & GSAP
        </div>
        <div className={styles.meta}>
          <span>
            <span className={styles.dot} /> online
          </span>
          <span>© {year}</span>
        </div>
      </div>
    </footer>
  );
}
