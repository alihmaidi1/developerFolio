import styles from "./AdminDashboardPage.module.css";

export function AdminDashboardPage() {
  return (
    <section className={styles.overview}>
      <header className={styles.header}>
        <div className={styles.headerCopy}>
          <p className={styles.eyebrow}>Workspace</p>
          <h1 className={styles.title}>Overview</h1>
          <p className={styles.intro}>
            Review what is ready and what comes next for your portfolio tools.
          </p>
        </div>
        <span className={styles.sessionStatus}>
          <span className={styles.statusDot} aria-hidden="true" />
          Session active
        </span>
      </header>
    </section>
  );
}
