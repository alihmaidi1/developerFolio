import styles from "./Loading.module.css";

export default function Loading() {
  return (
    <div className={styles.container} role="status" aria-label="Loading">
      <span className={styles.spinner} aria-hidden="true" />
    </div>
  );
}
