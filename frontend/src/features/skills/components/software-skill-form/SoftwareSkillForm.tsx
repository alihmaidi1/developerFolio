import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { resolveApiError } from "@/shared/lib/api-error";
import { FormField, Input, LoadingSpinner } from "@/shared/ui";
import {
  softwareSkillFormSchema,
  type SoftwareSkillFormValues,
} from "../../model/software-skill-form.schema";
import type { AdminSoftwareSkill } from "../../model/software-skill.types";
import { useUpsertSoftwareSkill } from "../../hooks/useUpsertSoftwareSkill";
import styles from "./SoftwareSkillForm.module.css";

interface SoftwareSkillFormProps {
  existing: AdminSoftwareSkill | null;
  onCancel: () => void;
  onSuccess: () => void;
}

export function SoftwareSkillForm({
  existing,
  onCancel,
  onSuccess,
}: SoftwareSkillFormProps) {
  const form = useForm<SoftwareSkillFormValues>({
    resolver: zodResolver(softwareSkillFormSchema),
    defaultValues: {
      name: existing?.name ?? "",
      iconClassName: existing?.iconClassName ?? "",
      isPublished: existing?.isPublished ?? false,
    },
  });

  useEffect(() => {
    form.reset({
      name: existing?.name ?? "",
      iconClassName: existing?.iconClassName ?? "",
      isPublished: existing?.isPublished ?? false,
    });
  }, [existing, form]);

  const mutation = useUpsertSoftwareSkill(existing, { onSuccess });

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
        <h3>{existing ? "Edit software skill" : "Add software skill"}</h3>
        <span>Pick a Font Awesome icon class.</span>
      </header>

      <FormField
        label="Name"
        htmlFor="software-skill-name"
        error={errors.name?.message}
        errorId="software-skill-name-error"
      >
        <Input
          id="software-skill-name"
          placeholder="reactjs"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={
            errors.name ? "software-skill-name-error" : undefined
          }
          {...form.register("name")}
        />
      </FormField>

      <FormField
        label="Icon class"
        htmlFor="software-skill-icon"
        error={errors.iconClassName?.message}
        errorId="software-skill-icon-error"
      >
        <Input
          id="software-skill-icon"
          placeholder="fab fa-react"
          aria-invalid={Boolean(errors.iconClassName)}
          aria-describedby={
            errors.iconClassName ? "software-skill-icon-error" : undefined
          }
          {...form.register("iconClassName")}
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
            {existing ? "Save changes" : "Add skill"}
          </button>
        </div>
      </div>
    </form>
  );
}
