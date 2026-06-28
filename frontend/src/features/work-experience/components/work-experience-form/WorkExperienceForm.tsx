import { useEffect, useMemo, type FormEventHandler } from "react";
import { useWatch, type UseFormReturn } from "react-hook-form";
import { ArrowRight, Briefcase, LoaderCircle } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Alert,
  BulletListField,
  Button,
  FormField,
  ImageUploadField,
  Input,
} from "@/shared/ui";
import { resolveAssetUrl } from "@/shared/lib/asset-url";
import {
  WORK_EXPERIENCE_LOGO_ALLOWED_TYPES,
  type WorkExperienceFormValues,
} from "../../model/work-experience-form.schema";
import styles from "./WorkExperienceForm.module.css";

interface WorkExperienceFormProps {
  form: UseFormReturn<WorkExperienceFormValues>;
  onSubmit: FormEventHandler<HTMLFormElement>;
  onChange: FormEventHandler<HTMLFormElement>;
  isPending: boolean;
  error: string | null;
  submitLabel: string;
  submittingLabel: string;
  existingLogoUrl: string | null;
}

export function WorkExperienceForm({
  form,
  onSubmit,
  onChange,
  isPending,
  error,
  submitLabel,
  submittingLabel,
  existingLogoUrl,
}: WorkExperienceFormProps) {
  const logoFile = useWatch({ control: form.control, name: "logoFile" });
  const company = useWatch({ control: form.control, name: "company" });
  const descriptionBullets = useWatch({
    control: form.control,
    name: "descriptionBullets",
  });
  const errors = form.formState.errors;

  const localPreview = useMemo(
    () => (logoFile ? URL.createObjectURL(logoFile) : null),
    [logoFile],
  );

  useEffect(
    () => () => {
      if (localPreview) {
        URL.revokeObjectURL(localPreview);
      }
    },
    [localPreview],
  );

  const previewSrc = localPreview ?? resolveAssetUrl(existingLogoUrl);

  return (
    <form
      className={styles.form}
      onSubmit={onSubmit}
      onChange={onChange}
      noValidate
    >
      <div className={styles.mainColumn}>
        <section
          className={styles.formSection}
          aria-labelledby="work-experience-basics"
        >
          <header className={styles.sectionHeader}>
            <span>01</span>
            <div>
              <h2 id="work-experience-basics">Role details</h2>
              <p>Role, company, and timeline shown on the public site.</p>
            </div>
          </header>

          <div className={styles.fields}>
            <FormField
              label="Role"
              htmlFor="work-experience-role"
              error={errors.role?.message}
              errorId="work-experience-role-error"
            >
              <Input
                id="work-experience-role"
                placeholder="Software Engineer"
                aria-invalid={Boolean(errors.role)}
                aria-describedby={
                  errors.role ? "work-experience-role-error" : undefined
                }
                {...form.register("role")}
              />
            </FormField>

            <div className={styles.twoColumns}>
              <FormField
                label="Company"
                htmlFor="work-experience-company"
                error={errors.company?.message}
                errorId="work-experience-company-error"
              >
                <Input
                  id="work-experience-company"
                  placeholder="Facebook"
                  aria-invalid={Boolean(errors.company)}
                  aria-describedby={
                    errors.company ? "work-experience-company-error" : undefined
                  }
                  {...form.register("company")}
                />
              </FormField>

              <FormField
                label="Date range"
                htmlFor="work-experience-date"
                error={errors.date?.message}
                errorId="work-experience-date-error"
              >
                <Input
                  id="work-experience-date"
                  placeholder="June 2018 - Present"
                  aria-invalid={Boolean(errors.date)}
                  aria-describedby={
                    errors.date ? "work-experience-date-error" : undefined
                  }
                  {...form.register("date")}
                />
              </FormField>
            </div>

            <FormField
              label="Description"
              htmlFor="work-experience-description"
              error={errors.description?.message}
              errorId="work-experience-description-error"
            >
              <textarea
                className={styles.textarea}
                id="work-experience-description"
                rows={4}
                placeholder="A short summary of your responsibilities and impact."
                aria-invalid={Boolean(errors.description)}
                aria-describedby={
                  errors.description
                    ? "work-experience-description-error"
                    : undefined
                }
                {...form.register("description")}
              />
            </FormField>
          </div>
        </section>

        <section
          className={styles.formSection}
          aria-labelledby="work-experience-logo"
        >
          <header className={styles.sectionHeader}>
            <span>02</span>
            <div>
              <h2 id="work-experience-logo">Company logo</h2>
              <p>Square logo shown next to the entry on the public site.</p>
            </div>
          </header>

          <div className={styles.fields}>
            <ImageUploadField
              label="Company logo"
              value={logoFile ?? null}
              existingImageUrl={existingLogoUrl}
              error={errors.logoFile?.message}
              acceptedTypes={WORK_EXPERIENCE_LOGO_ALLOWED_TYPES}
              helperText="PNG, JPEG, WEBP, GIF, or SVG up to 5 MB."
              emptyLabel="Choose a logo"
              replaceLabel="Replace current logo"
              onSelect={(file) =>
                form.setValue("logoFile", file, {
                  shouldValidate: true,
                  shouldDirty: true,
                })
              }
            />
          </div>
        </section>

        <section
          className={styles.formSection}
          aria-labelledby="work-experience-bullets"
        >
          <header className={styles.sectionHeader}>
            <span>03</span>
            <div>
              <h2 id="work-experience-bullets">Highlights</h2>
              <p>Optional bullet points displayed under the entry.</p>
            </div>
          </header>

          <div className={styles.fields}>
            <FormField
              label="Highlight bullets"
              htmlFor="work-experience-bullets-list"
              error={errors.descriptionBullets?.message}
              errorId="work-experience-bullets-error"
            >
              <BulletListField
                value={descriptionBullets ?? []}
                onChange={(next) =>
                  form.setValue("descriptionBullets", next, {
                    shouldValidate: true,
                    shouldDirty: true,
                  })
                }
                placeholder="Led a team to ship…"
                addLabel="Add bullet"
                maxItems={10}
                ariaLabel="Work experience highlight bullets"
              />
            </FormField>
          </div>
        </section>
      </div>

      <aside className={styles.sideColumn}>
        <section
          className={styles.previewSection}
          aria-labelledby="work-experience-preview"
        >
          <header>
            <h2 id="work-experience-preview">Preview</h2>
            <span>Logo</span>
          </header>
          <div className={styles.preview}>
            {previewSrc ? (
              <img src={previewSrc} alt="" />
            ) : (
              <span>
                <Briefcase aria-hidden="true" />
                Logo preview
              </span>
            )}
          </div>
          <strong>{company || "Untitled company"}</strong>
        </section>

        <section
          className={styles.settingsSection}
          aria-labelledby="work-experience-settings"
        >
          <header>
            <h2 id="work-experience-settings">Publishing</h2>
            <p>Control whether this entry appears on the portfolio.</p>
          </header>

          <label className={styles.publishToggle}>
            <input type="checkbox" {...form.register("isPublished")} />
            <span aria-hidden="true" />
            <span>
              <strong>Published</strong>
              <small>Show this entry in the public portfolio.</small>
            </span>
          </label>
        </section>

        {error && (
          <Alert className={styles.alert} variant="error">
            {error}
          </Alert>
        )}

        <div className={styles.actions}>
          <Link className={styles.cancel} to="/admin/work-experience">
            Cancel
          </Link>
          <Button type="submit" disabled={isPending} fullWidth>
            <span>{isPending ? submittingLabel : submitLabel}</span>
            {isPending ? (
              <LoaderCircle className={styles.spinner} aria-hidden="true" />
            ) : (
              <ArrowRight aria-hidden="true" />
            )}
          </Button>
        </div>
      </aside>
    </form>
  );
}
