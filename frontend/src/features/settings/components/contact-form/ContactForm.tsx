import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { resolveApiError } from "@/shared/lib/api-error";
import { FormField, Input } from "@/shared/ui";
import {
  contactFormSchema,
  type ContactFormValues,
} from "../../model/contact-form.schema";
import type { ContactSettings } from "../../model/settings.types";
import { useUpdateContact } from "../../hooks/useUpdateContact";
import styles from "./ContactForm.module.css";

interface ContactFormProps {
  contact: ContactSettings;
}

export function ContactForm({ contact }: ContactFormProps) {
  const [savedOnce, setSavedOnce] = useState(false);
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      title: contact.title,
      subtitle: contact.subtitle,
      email: contact.email ?? "",
      phone: contact.phone ?? "",
      address: contact.address ?? "",
    },
  });

  useEffect(() => {
    form.reset({
      title: contact.title,
      subtitle: contact.subtitle,
      email: contact.email ?? "",
      phone: contact.phone ?? "",
      address: contact.address ?? "",
    });
  }, [contact, form]);

  const mutation = useUpdateContact();
  const errors = form.formState.errors;

  const onSubmit = form.handleSubmit(async (values) => {
    mutation.reset();
    try {
      await mutation.mutateAsync({
        title: values.title,
        subtitle: values.subtitle,
        email: values.email || null,
        phone: values.phone || null,
        address: values.address || null,
      });
      setSavedOnce(true);
    } catch {
      // noop
    }
  });

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <header>
        <h2 className={styles.title}>Contact</h2>
        <p className={styles.subtitle}>
          Contact details displayed in the public portfolio footer.
        </p>
      </header>

      <FormField
        label="Title"
        htmlFor="contact-title"
        error={errors.title?.message}
        errorId="contact-title-error"
      >
        <Input
          id="contact-title"
          placeholder="Contact Me"
          aria-invalid={Boolean(errors.title)}
          aria-describedby={errors.title ? "contact-title-error" : undefined}
          {...form.register("title")}
        />
      </FormField>

      <FormField
        label="Subtitle"
        htmlFor="contact-subtitle"
        error={errors.subtitle?.message}
        errorId="contact-subtitle-error"
      >
        <textarea
          id="contact-subtitle"
          className={styles.textarea}
          rows={3}
          placeholder="A short call to action for visitors."
          aria-invalid={Boolean(errors.subtitle)}
          aria-describedby={
            errors.subtitle ? "contact-subtitle-error" : undefined
          }
          {...form.register("subtitle")}
        />
      </FormField>

      <FormField
        label="Email"
        htmlFor="contact-email"
        error={errors.email?.message}
        errorId="contact-email-error"
      >
        <Input
          id="contact-email"
          type="email"
          placeholder="you@example.com"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "contact-email-error" : undefined}
          {...form.register("email")}
        />
      </FormField>

      <FormField
        label="Phone"
        htmlFor="contact-phone"
        error={errors.phone?.message}
        errorId="contact-phone-error"
      >
        <Input
          id="contact-phone"
          placeholder="+1 555 555 1234"
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={errors.phone ? "contact-phone-error" : undefined}
          {...form.register("phone")}
        />
      </FormField>

      <FormField
        label="Address"
        htmlFor="contact-address"
        error={errors.address?.message}
        errorId="contact-address-error"
      >
        <Input
          id="contact-address"
          placeholder="City, Country"
          aria-invalid={Boolean(errors.address)}
          aria-describedby={
            errors.address ? "contact-address-error" : undefined
          }
          {...form.register("address")}
        />
      </FormField>

      {mutation.isError && (
        <p className={styles.alert} role="alert">
          {resolveApiError(mutation.error)}
        </p>
      )}

      {!mutation.isError && savedOnce && !mutation.isPending && (
        <p className={styles.success}>Contact saved successfully.</p>
      )}

      <div className={styles.row}>
        <span />
        <div className={styles.actions}>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={mutation.isPending}
          >
            {mutation.isPending && (
              <LoaderCircle className={styles.spinner} aria-hidden="true" />
            )}
            Save changes
          </button>
        </div>
      </div>
    </form>
  );
}
