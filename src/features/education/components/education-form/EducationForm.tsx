import { useEffect, useMemo, type FormEventHandler } from "react";
import { useWatch, type UseFormReturn } from "react-hook-form";
import { ArrowRight, GraduationCap, LoaderCircle } from "lucide-react";
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
  EDUCATION_LOGO_ALLOWED_TYPES,
  type EducationFormValues,
} from "../../model/education-form.schema";
import styles from "./EducationForm.module.css";

interface EducationFormProps {
  form: UseFormReturn<EducationFormValues>;
  onSubmit: FormEventHandler<HTMLFormElement>;
  onChange: FormEventHandler<HTMLFormElement>;
  isPending: boolean;
  error: string | null;
  submitLabel: string;
  submittingLabel: string;
  existingLogoUrl: string | null;
}

export function EducationForm({
  form,
  onSubmit,
  onChange,
  isPending,
  error,
  submitLabel,
  submittingLabel,
  existingLogoUrl,
}: EducationFormProps) {
  const logoFile = useWatch({ control: form.control, name: "logoFile" });
  const schoolName = useWatch({ control: form.control, name: "schoolName" });
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
          aria-labelledby="education-basics"
        >
          <header className={styles.sectionHeader}>
            <span>01</span>
            <div>
              <h2 id="education-basics">Education details</h2>
              <p>School, degree, and timeline shown on the public site.</p>
            </div>
          </header>

          <div className={styles.fields}>
            <FormField
              label="School"
              htmlFor="education-school"
              error={errors.schoolName?.message}
              errorId="education-school-error"
            >
              <Input
                id="education-school"
                placeholder="Stanford University"
                aria-invalid={Boolean(errors.schoolName)}
                aria-describedby={
                  errors.schoolName ? "education-school-error" : undefined
                }
                {...form.register("schoolName")}
              />
            </FormField>

            <div className={styles.twoColumns}>
              <FormField
                label="Degree"
                htmlFor="education-degree"
                error={errors.degree?.message}
                errorId="education-degree-error"
              >
                <Input
                  id="education-degree"
                  placeholder="Bachelor of Science in Computer Science"
                  aria-invalid={Boolean(errors.degree)}
                  aria-describedby={
                    errors.degree ? "education-degree-error" : undefined
                  }
                  {...form.register("degree")}
                />
              </FormField>

              <FormField
                label="Duration"
                htmlFor="education-duration"
                error={errors.duration?.message}
                errorId="education-duration-error"
              >
                <Input
                  id="education-duration"
                  placeholder="September 2017 - April 2019"
                  aria-invalid={Boolean(errors.duration)}
                  aria-describedby={
                    errors.duration ? "education-duration-error" : undefined
                  }
                  {...form.register("duration")}
                />
              </FormField>
            </div>

            <FormField
              label="Description"
              htmlFor="education-description"
              error={errors.description?.message}
              errorId="education-description-error"
            >
              <textarea
                className={styles.textarea}
                id="education-description"
                rows={4}
                placeholder="A short summary of your time at this school."
                aria-invalid={Boolean(errors.description)}
                aria-describedby={
                  errors.description ? "education-description-error" : undefined
                }
                {...form.register("description")}
              />
            </FormField>
          </div>
        </section>

        <section
          className={styles.formSection}
          aria-labelledby="education-logo"
        >
          <header className={styles.sectionHeader}>
            <span>02</span>
            <div>
              <h2 id="education-logo">Logo</h2>
              <p>Square logo shown next to the entry on the public site.</p>
            </div>
          </header>

          <div className={styles.fields}>
            <ImageUploadField
              label="School logo"
              value={logoFile ?? null}
              existingImageUrl={existingLogoUrl}
              error={errors.logoFile?.message}
              acceptedTypes={EDUCATION_LOGO_ALLOWED_TYPES}
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
          aria-labelledby="education-bullets"
        >
          <header className={styles.sectionHeader}>
            <span>03</span>
            <div>
              <h2 id="education-bullets">Highlights</h2>
              <p>Optional bullet points displayed under the entry.</p>
            </div>
          </header>

          <div className={styles.fields}>
            <FormField
              label="Highlight bullets"
              htmlFor="education-bullets-list"
              error={errors.descriptionBullets?.message}
              errorId="education-bullets-error"
            >
              <BulletListField
                value={descriptionBullets ?? []}
                onChange={(next) =>
                  form.setValue("descriptionBullets", next, {
                    shouldValidate: true,
                    shouldDirty: true,
                  })
                }
                placeholder="Published 3 papers on…"
                addLabel="Add bullet"
                maxItems={10}
                ariaLabel="Education highlight bullets"
              />
            </FormField>
          </div>
        </section>
      </div>

      <aside className={styles.sideColumn}>
        <section
          className={styles.previewSection}
          aria-labelledby="education-preview"
        >
          <header>
            <h2 id="education-preview">Preview</h2>
            <span>Logo</span>
          </header>
          <div className={styles.preview}>
            {previewSrc ? (
              <img src={previewSrc} alt="" />
            ) : (
              <span>
                <GraduationCap aria-hidden="true" />
                Logo preview
              </span>
            )}
          </div>
          <strong>{schoolName || "Untitled school"}</strong>
        </section>

        <section
          className={styles.settingsSection}
          aria-labelledby="education-settings"
        >
          <header>
            <h2 id="education-settings">Publishing</h2>
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
          <Link className={styles.cancel} to="/admin/education">
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
