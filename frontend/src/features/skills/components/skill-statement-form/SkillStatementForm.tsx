import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { resolveApiError } from "@/shared/lib/api-error";
import { FormField, LoadingSpinner } from "@/shared/ui";
import {
  skillStatementFormSchema,
  type SkillStatementFormValues,
} from "../../model/skill-statement-form.schema";
import type { AdminSkillStatement } from "../../model/skill-statement.types";
import { useUpsertSkillStatement } from "../../hooks/useUpsertSkillStatement";
import styles from "./SkillStatementForm.module.css";

interface SkillStatementFormProps {
  existing: AdminSkillStatement | null;
  onCancel: () => void;
  onSuccess: () => void;
}

export function SkillStatementForm({
  existing,
  onCancel,
  onSuccess,
}: SkillStatementFormProps) {
  const form = useForm<SkillStatementFormValues>({
    resolver: zodResolver(skillStatementFormSchema),
    defaultValues: {
      text: existing?.text ?? "",
      isPublished: existing?.isPublished ?? false,
    },
  });

  useEffect(() => {
    form.reset({
      text: existing?.text ?? "",
      isPublished: existing?.isPublished ?? false,
    });
  }, [existing, form]);

  const mutation = useUpsertSkillStatement(existing, { onSuccess });

  const onSubmit = form.handleSubmit(async (values) => {
    mutation.reset();
    try {
      await mutation.mutateAsync(values);
    } catch {
      // noop
    }
  });

  const errors = form.formState.errors;

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <header className={styles.formHeader}>
        <h3>{existing ? "Edit statement" : "Add statement"}</h3>
        <span>What you do for clients or teams.</span>
      </header>

      <FormField
        label="Statement"
        htmlFor="skill-statement-text"
        error={errors.text?.message}
        errorId="skill-statement-text-error"
      >
        <textarea
          id="skill-statement-text"
          className={styles.textarea}
          rows={3}
          placeholder="Develop interactive front-end interfaces…"
          aria-invalid={Boolean(errors.text)}
          aria-describedby={
            errors.text ? "skill-statement-text-error" : undefined
          }
          {...form.register("text")}
        />
      </FormField>

      {mutation.isError && (
        <p className={styles.alert} role="alert">
          {resolveApiError(mutation.error)}
        </p>
      )}

      <div className={styles.row}>
        <label className={styles.publishToggle}>
          <input type="checkbox" {...form.register("isPublished")} />
          Published
        </label>
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={onCancel}
            disabled={mutation.isPending}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={mutation.isPending}
          >
            {mutation.isPending && (
              <LoadingSpinner className={styles.spinner} />
            )}
            {existing ? "Save changes" : "Add statement"}
          </button>
        </div>
      </div>
    </form>
  );
}
