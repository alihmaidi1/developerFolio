import { Link } from "react-router-dom";
import { LockKeyhole } from "lucide-react";
import { AdminLoginForm } from "../components/AdminLoginForm";
import { useAdminLogin } from "../hooks/useAdminLogin";
import styles from "./AdminLoginPage.module.css";

export function AdminLoginPage() {
  const { form, submit, isPending, error, clearError } = useAdminLogin();

  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <Link to="/" className={styles.brand} aria-label="Return to portfolio">
          <span className={styles.brandMark}>AH</span>
        </Link>

        <p className={styles.eyebrow}>Admin sign in</p>
        <h1 className={styles.title}>Welcome back</h1>
        <p className={styles.intro}>
          Sign in to manage your portfolio content.
        </p>

        <AdminLoginForm
          form={form}
          onSubmit={submit}
          onChange={clearError}
          isPending={isPending}
          error={error}
        />

        <p className={styles.accessNote}>
          <LockKeyhole aria-hidden="true" />
          Access is limited to the portfolio owner.
        </p>
      </div>
    </main>
  );
}
