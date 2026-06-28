import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { resolveApiError } from "@/shared/lib/api-error";
import { FormField, Input, LoadingSpinner } from "@/shared/ui";
import {
  greetingFormSchema,
  type GreetingFormValues,
} from "../../model/greeting-form.schema";
import type { GreetingSettings } from "../../model/settings.types";
import { useUpdateGreeting } from "../../hooks/useUpdateGreeting";
import styles from "./GreetingForm.module.css";

interface GreetingFormProps {
  greeting: GreetingSettings;
}

export function GreetingForm({ greeting }: GreetingFormProps) {
  const [savedOnce, setSavedOnce] = useState(false);

  const buildDefaults = (entry: GreetingSettings): GreetingFormValues => ({
    username: entry.username,
    title: entry.title,
    subTitle: entry.subTitle,
    resumeUrl: entry.resumeUrl ?? "",
    displayGreeting: entry.displayGreeting,
  });

  const form = useForm<GreetingFormValues>({
    resolver: zodResolver(greetingFormSchema),
    defaultValues: buildDefaults(greeting),
  });

  useEffect(() => {
    form.reset(buildDefaults(greeting));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [greeting]);

  const mutation = useUpdateGreeting();
  const errors = form.formState.errors;

  const onSubmit = form.handleSubmit(async (values) => {
    mutation.reset();
    try {
      await mutation.mutateAsync({
        username: values.username,
        title: values.title,
        subTitle: values.subTitle,
        resumeUrl: values.resumeUrl || null,
        displayGreeting: values.displayGreeting,
      });
      setSavedOnce(true);
    } catch {
      // surfaced via mutation.isError
    }
  });

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <header>
        <h2 className={styles.title}>Greeting</h2>
        <p className={styles.subtitle}>
          The first impression visitors see at the top of the portfolio.
        </p>
      </header>

      <FormField
        label="Username"
        htmlFor="greeting-username"
        error={errors.username?.message}
        errorId="greeting-username-error"
      >
        <Input
          id="greeting-username"
          placeholder="Ali Hmaidi"
          aria-invalid={Boolean(errors.username)}
          aria-describedby={
            errors.username ? "greeting-username-error" : undefined
          }
          {...form.register("username")}
        />
      </FormField>

      <FormField
        label="Title"
        htmlFor="greeting-title"
        error={errors.title?.message}
        errorId="greeting-title-error"
      >
        <Input
          id="greeting-title"
          placeholder="Hi all, I'm Ali"
          aria-invalid={Boolean(errors.title)}
          aria-describedby={errors.title ? "greeting-title-error" : undefined}
          {...form.register("title")}
        />
      </FormField>

      <FormField
        label="Subtitle"
        htmlFor="greeting-subtitle"
        error={errors.subTitle?.message}
        errorId="greeting-subtitle-error"
      >
        <textarea
          id="greeting-subtitle"
          className={styles.textarea}
          rows={4}
          placeholder="A short description of who you are and what you build."
          aria-invalid={Boolean(errors.subTitle)}
          aria-describedby={
            errors.subTitle ? "greeting-subtitle-error" : undefined
          }
          {...form.register("subTitle")}
        />
      </FormField>

      <FormField
        label="Resume URL"
        htmlFor="greeting-resume"
        error={errors.resumeUrl?.message}
        errorId="greeting-resume-error"
      >
        <Input
          id="greeting-resume"
          type="url"
          placeholder="https://example.com/resume.pdf"
          aria-invalid={Boolean(errors.resumeUrl)}
          aria-describedby={
            errors.resumeUrl ? "greeting-resume-error" : undefined
          }
          {...form.register("resumeUrl")}
        />
      </FormField>

      {mutation.isError && (
        <p className={styles.alert} role="alert">
          {resolveApiError(mutation.error)}
        </p>
      )}

      {!mutation.isError && savedOnce && !mutation.isPending && (
        <p className={styles.success}>Greeting saved successfully.</p>
      )}

      <div className={styles.row}>
        <label className={styles.toggle}>
          <input type="checkbox" {...form.register("displayGreeting")} />
          Display greeting on public portfolio
        </label>
        <div className={styles.actions}>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={mutation.isPending}
          >
            {mutation.isPending && (
              <LoadingSpinner className={styles.spinner} />
            )}
            Save changes
          </button>
        </div>
      </div>
    </form>
  );
}
