import { useState, type FormEventHandler } from "react";
import type { UseFormReturn } from "react-hook-form";
import { ArrowRight, Eye, EyeOff, LoaderCircle } from "lucide-react";
import { Alert, Button, FormField, IconButton, Input } from "@/shared/ui";
import type { AdminLoginValues } from "../model/auth.schema";
import styles from "./AdminLoginForm.module.css";

interface AdminLoginFormProps {
  form: UseFormReturn<AdminLoginValues>;
  onSubmit: FormEventHandler<HTMLFormElement>;
  onChange: FormEventHandler<HTMLFormElement>;
  isPending: boolean;
  error: string | null;
}

export function AdminLoginForm({
  form,
  onSubmit,
  onChange,
  isPending,
  error,
}: AdminLoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const emailError = form.formState.errors.email?.message;
  const passwordError = form.formState.errors.password?.message;

  return (
    <form
      className={styles.form}
      onSubmit={onSubmit}
      onChange={onChange}
      noValidate
    >
      <FormField
        label="Email address"
        htmlFor="admin-email"
        error={emailError}
        errorId="admin-email-error"
      >
        <Input
          id="admin-email"
          type="email"
          autoComplete="email"
          placeholder="admin@example.com"
          aria-invalid={Boolean(emailError)}
          aria-describedby={emailError ? "admin-email-error" : undefined}
          {...form.register("email")}
        />
      </FormField>

      <FormField
        label="Password"
        htmlFor="admin-password"
        error={passwordError}
        errorId="admin-password-error"
      >
        <div className={styles.password}>
          <Input
            className={styles.passwordInput}
            id="admin-password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="Enter your password"
            aria-invalid={Boolean(passwordError)}
            aria-describedby={
              passwordError ? "admin-password-error" : undefined
            }
            {...form.register("password")}
          />
          <IconButton
            className={styles.passwordToggle}
            onClick={() => setShowPassword((current) => !current)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff aria-hidden="true" />
            ) : (
              <Eye aria-hidden="true" />
            )}
          </IconButton>
        </div>
      </FormField>

      {error && (
        <Alert className={styles.formAlert} variant="error">
          {error}
        </Alert>
      )}

      <Button type="submit" disabled={isPending} fullWidth size="large">
        <span>{isPending ? "Signing in" : "Sign in"}</span>
        {isPending ? (
          <LoaderCircle className={styles.spinner} aria-hidden="true" />
        ) : (
          <ArrowRight aria-hidden="true" />
        )}
      </Button>
    </form>
  );
}
