import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { resolveApiError } from "@/shared/lib/api-error";
import { FormField, Input, LoadingSpinner } from "@/shared/ui";
import {
  socialLinkFormSchema,
  type SocialLinkFormValues,
} from "../../model/social-link-form.schema";
import type { AdminSocialLink } from "../../model/settings.types";
import { useUpsertSocialLink } from "../../hooks/useUpsertSocialLink";
import styles from "./SocialLinkForm.module.css";

interface SocialLinkFormProps {
  existing: AdminSocialLink | null;
  onCancel: () => void;
  onSuccess: () => void;
}

export function SocialLinkForm({
  existing,
  onCancel,
  onSuccess,
}: SocialLinkFormProps) {
  const form = useForm<SocialLinkFormValues>({
    resolver: zodResolver(socialLinkFormSchema),
    defaultValues: {
      name: existing?.name ?? "",
      url: existing?.url ?? "",
      iconClassName: existing?.iconClassName ?? "",
      isPublished: existing?.isPublished ?? true,
    },
  });

  useEffect(() => {
    form.reset({
      name: existing?.name ?? "",
      url: existing?.url ?? "",
      iconClassName: existing?.iconClassName ?? "",
      isPublished: existing?.isPublished ?? true,
    });
  }, [existing, form]);

  const mutation = useUpsertSocialLink(existing, { onSuccess });
  const errors = form.formState.errors;

  const onSubmit = form.handleSubmit(async (values) => {
    mutation.reset();
    try {
      await mutation.mutateAsync(values);
    } catch {
      // noop
    }
  });

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <header className={styles.formHeader}>
        <h3>{existing ? "Edit social link" : "Add social link"}</h3>
        <span>Pick a Font Awesome icon class for the channel.</span>
      </header>

      <FormField
        label="Name"
        htmlFor="social-link-name"
        error={errors.name?.message}
        errorId="social-link-name-error"
      >
        <Input
          id="social-link-name"
          placeholder="GitHub"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "social-link-name-error" : undefined}
          {...form.register("name")}
        />
      </FormField>

      <FormField
        label="URL"
        htmlFor="social-link-url"
        error={errors.url?.message}
        errorId="social-link-url-error"
      >
        <Input
          id="social-link-url"
          placeholder="https://github.com/username"
          aria-invalid={Boolean(errors.url)}
          aria-describedby={errors.url ? "social-link-url-error" : undefined}
          {...form.register("url")}
        />
      </FormField>

      <FormField
        label="Icon class"
        htmlFor="social-link-icon"
        error={errors.iconClassName?.message}
        errorId="social-link-icon-error"
      >
        <Input
          id="social-link-icon"
          placeholder="fab fa-github"
          aria-invalid={Boolean(errors.iconClassName)}
          aria-describedby={
            errors.iconClassName ? "social-link-icon-error" : undefined
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
            {existing ? "Save changes" : "Add link"}
          </button>
        </div>
      </div>
    </form>
  );
}
