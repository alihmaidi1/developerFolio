import { Link, Navigate } from "react-router-dom";
import { LockKeyhole, ShieldCheck } from "lucide-react";
import { useAppSelector } from "@/app/store";
import { AdminLoginForm } from "../components/AdminLoginForm";
import { useAdminLogin } from "../hooks/useAdminLogin";
import styles from "./AdminLoginPage.module.css";

export function AdminLoginPage() {
  const admin = useAppSelector((state) => state.adminAuth.user);
  const { form, submit, isPending, error, clearError } = useAdminLogin();

  if (admin) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link to="/" className={styles.brand} aria-label="Return to portfolio">
          <span className={styles.brandMark}>AH</span>
          <strong className={styles.brandName}>Control</strong>
        </Link>
        <div className={styles.secureLabel}>
          <LockKeyhole aria-hidden="true" />
          Private access
        </div>
      </header>

      <section className={styles.content}>
        <div className={styles.formColumn}>
          <p className={styles.eyebrow}>Portfolio administration</p>
          <h1 className={styles.title}>Welcome back.</h1>
          <p className={styles.intro}>
            Sign in to manage projects and keep your resume current.
          </p>
          <AdminLoginForm
            form={form}
            onSubmit={submit}
            onChange={clearError}
            isPending={isPending}
            error={error}
          />
        </div>

        <aside className={styles.context} aria-label="Security information">
          <span className={styles.index}>01</span>
          <div className={styles.contextCopy}>
            <ShieldCheck aria-hidden="true" />
            <p>Single-admin workspace</p>
            <span>
              Your session is protected with a short-lived access token.
            </span>
          </div>
          <div className={styles.signal} aria-hidden="true">
            <span className={styles.signalDot} />
            API ready
          </div>
        </aside>
      </section>
    </main>
  );
}
