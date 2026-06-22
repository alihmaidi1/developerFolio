import styles from "./AdminOverviewPage.module.css";

export function AdminOverviewPage() {
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

      <dl className={styles.summary} aria-label="Workspace status">
        <div className={styles.summaryItem}>
          <dt>Authentication</dt>
          <dd className={styles.readyValue}>Ready</dd>
        </div>
        <div className={styles.summaryItem}>
          <dt>Projects editor</dt>
          <dd>Next</dd>
        </div>
        <div className={styles.summaryItem}>
          <dt>Resume editor</dt>
          <dd>Planned</dd>
        </div>
      </dl>

      <section className={styles.nextActions} aria-labelledby="next-actions">
        <header className={styles.sectionHeader}>
          <div>
            <h2 id="next-actions" className={styles.sectionLabel}>
              Setup queue
            </h2>
            <p>Features planned for the next workspace iteration.</p>
          </div>
          <span className={styles.actionCount}>2 planned</span>
        </header>
        <ol className={styles.actionList}>
          <li className={styles.action}>
            <span className={styles.actionIndex}>01</span>
            <div className={styles.actionCopy}>
              <strong>Project management</strong>
              <p>Create, edit, order, and publish portfolio projects.</p>
            </div>
            <span className={styles.actionStatePrimary}>Next</span>
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
