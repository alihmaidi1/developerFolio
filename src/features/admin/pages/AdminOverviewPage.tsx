import styles from "./AdminOverviewPage.module.css";

export function AdminOverviewPage() {
  return (
    <section className={styles.overview}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Admin workspace</p>
        <h1 className={styles.title}>Content overview</h1>
        <p className={styles.intro}>
          Manage the portfolio content from one focused workspace. Project and
          resume editors are the next features.
        </p>
      </header>

      <div className={styles.status} aria-label="Workspace status">
        <span className={styles.statusLabel}>Authentication</span>
        <strong className={styles.statusValue}>
          <span className={styles.statusDot} aria-hidden="true" />
          Session active
        </strong>
      </div>

      <section className={styles.nextActions} aria-labelledby="next-actions">
        <header className={styles.sectionHeader}>
          <h2 id="next-actions" className={styles.sectionLabel}>
            Next actions
          </h2>
          <span className={styles.actionCount}>2 planned</span>
        </header>
        <ol className={styles.actionList}>
          <li className={styles.action}>
            <span className={styles.actionIndex}>01</span>
            <div className={styles.actionCopy}>
              <strong>Project management</strong>
              <p>Create, edit, order, and publish portfolio projects.</p>
            </div>
            <span className={styles.actionState}>Next</span>
          </li>
          <li className={styles.action}>
            <span className={styles.actionIndex}>02</span>
            <div className={styles.actionCopy}>
              <strong>Resume replacement</strong>
              <p>Upload and replace the public resume from the workspace.</p>
            </div>
            <span className={styles.actionState}>Planned</span>
          </li>
        </ol>
      </section>
    </section>
  );
}
