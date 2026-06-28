import type { ReactNode } from "react";
import styles from "./FormField.module.css";

interface FormFieldProps {
  children: ReactNode;
  error?: string;
  errorId?: string;
  htmlFor: string;
  label: string;
}

export function FormField({
  children,
  error,
  errorId,
  htmlFor,
  label,
}: FormFieldProps) {
  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={htmlFor}>
        {label}
      </label>
      {children}
      {error && (
        <span id={errorId} className={styles.error}>
          {error}
        </span>
      )}
    </div>
  );
}
