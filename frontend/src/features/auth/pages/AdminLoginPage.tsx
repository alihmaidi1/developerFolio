import { Link } from "react-router-dom";
import { CheckCircle2, LockKeyhole, ShieldCheck } from "lucide-react";
import { AdminLoginForm } from "../components/AdminLoginForm";
import { useAdminLogin } from "../hooks/useAdminLogin";
import styles from "./AdminLoginPage.module.css";

export function AdminLoginPage() {
  const { form, submit, isPending, error, clearError } = useAdminLogin();

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link to="/" className={styles.brand} aria-label="Return to portfolio">
          <span className={styles.brandMark}>AH</span>
          <span className={styles.brandCopy}>
            <strong className={styles.brandName}>Control</strong>
            <small>Portfolio workspace</small>
          </span>
        </Link>
        <div className={styles.secureLabel}>
          <LockKeyhole aria-hidden="true" />
          Private access
        </div>
      </header>

      <section className={styles.content}>
        <div className={styles.formColumn}>
          <div className={styles.formPanel}>
            <p className={styles.eyebrow}>Admin sign in</p>
            <h1 className={styles.title}>Welcome back</h1>
            <p className={styles.intro}>
              Use your admin account to manage portfolio content.
            </p>
            <AdminLoginForm
              form={form}
              onSubmit={submit}
              onChange={clearError}
              isPending={isPending}
              error={error}
            />
            <p className={styles.accessNote}>
              Access is limited to the portfolio owner.
            </p>
          </div>
        </div>

        <aside className={styles.context} aria-label="Security information">
          <div className={styles.contextHeader}>
            <span className={styles.contextLabel}>Private workspace</span>
            <span className={styles.index}>01</span>
          </div>
          <div className={styles.contextCopy}>
            <span className={styles.contextIcon}>
              <ShieldCheck aria-hidden="true" />
            </span>
            <h2>Everything you need, without the noise.</h2>
            <p>
              A focused space for keeping projects and your public resume up to
              date.
            </p>
            <ul className={styles.contextList}>
              <li>
                <CheckCircle2 aria-hidden="true" />
                Secure single-admin access
              </li>
              <li>
                <CheckCircle2 aria-hidden="true" />
                One place for portfolio content
              </li>
            </ul>
          </div>
          <div className={styles.signal} aria-hidden="true">
            <span className={styles.signalDot} />
            Secure session ready
          </div>
        </aside>
      </section>
    </main>
  );
}
