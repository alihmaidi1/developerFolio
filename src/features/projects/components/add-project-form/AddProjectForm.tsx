import { useState, type FormEventHandler } from "react";
import { useWatch, type UseFormReturn } from "react-hook-form";
import { ArrowRight, ImageIcon, LoaderCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Alert, Button, FormField, Input } from "@/shared/ui";
import type { CreateProjectFormValues } from "../../model/create-project.schema";
import styles from "./AddProjectForm.module.css";

interface AddProjectFormProps {
  form: UseFormReturn<CreateProjectFormValues>;
  onSubmit: FormEventHandler<HTMLFormElement>;
  onChange: FormEventHandler<HTMLFormElement>;
  isPending: boolean;
  error: string | null;
}

export function AddProjectForm({
  form,
  onSubmit,
  onChange,
  isPending,
  error,
}: AddProjectFormProps) {
  const [failedPreviewUrl, setFailedPreviewUrl] = useState<string | null>(null);
  const imageUrl = useWatch({ control: form.control, name: "imageUrl" });
  const title = useWatch({ control: form.control, name: "title" });
  const errors = form.formState.errors;

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
          aria-labelledby="project-basics"
        >
          <header className={styles.sectionHeader}>
            <span>01</span>
            <div>
              <h2 id="project-basics">Project details</h2>
              <p>The primary content shown in the admin list and portfolio.</p>
            </div>
          </header>

          <div className={styles.fields}>
            <FormField
              label="Title"
              htmlFor="project-title"
              error={errors.title?.message}
              errorId="project-title-error"
            >
              <Input
                id="project-title"
                placeholder="Developer portfolio"
                aria-invalid={Boolean(errors.title)}
                aria-describedby={
                  errors.title ? "project-title-error" : undefined
                }
                {...form.register("title")}
              />
            </FormField>

            <FormField
              label="Summary"
              htmlFor="project-summary"
              error={errors.summary?.message}
              errorId="project-summary-error"
            >
              <textarea
                className={styles.textarea}
                id="project-summary"
                rows={3}
                placeholder="A short description for quick scanning."
                aria-invalid={Boolean(errors.summary)}
                aria-describedby={
                  errors.summary ? "project-summary-error" : undefined
                }
                {...form.register("summary")}
              />
            </FormField>

            <FormField
              label="Description"
              htmlFor="project-description"
              error={errors.description?.message}
              errorId="project-description-error"
            >
              <textarea
                className={styles.textarea}
                id="project-description"
                rows={7}
                placeholder="Explain the problem, your approach, and the result."
                aria-invalid={Boolean(errors.description)}
                aria-describedby={
                  errors.description ? "project-description-error" : undefined
                }
                {...form.register("description")}
              />
            </FormField>
          </div>
        </section>

        <section className={styles.formSection} aria-labelledby="project-media">
          <header className={styles.sectionHeader}>
            <span>02</span>
            <div>
              <h2 id="project-media">Media and links</h2>
              <p>Optional destinations and the visual used for this project.</p>
            </div>
          </header>

          <div className={styles.fields}>
            <FormField
              label="Image URL"
              htmlFor="project-image-url"
              error={errors.imageUrl?.message}
              errorId="project-image-url-error"
            >
              <Input
                id="project-image-url"
                type="url"
                placeholder="https://example.com/project.jpg"
                aria-invalid={Boolean(errors.imageUrl)}
                aria-describedby={
                  errors.imageUrl ? "project-image-url-error" : undefined
                }
                {...form.register("imageUrl")}
              />
            </FormField>

            <div className={styles.twoColumns}>
              <FormField
                label="Repository URL"
                htmlFor="project-repository-url"
                error={errors.repositoryUrl?.message}
                errorId="project-repository-url-error"
              >
                <Input
                  id="project-repository-url"
                  type="url"
                  placeholder="https://github.com/..."
                  aria-invalid={Boolean(errors.repositoryUrl)}
                  aria-describedby={
                    errors.repositoryUrl
                      ? "project-repository-url-error"
                      : undefined
                  }
                  {...form.register("repositoryUrl")}
                />
              </FormField>

              <FormField
                label="Live URL"
                htmlFor="project-live-url"
                error={errors.liveUrl?.message}
                errorId="project-live-url-error"
              >
                <Input
                  id="project-live-url"
                  type="url"
                  placeholder="https://project.example.com"
                  aria-invalid={Boolean(errors.liveUrl)}
                  aria-describedby={
                    errors.liveUrl ? "project-live-url-error" : undefined
                  }
                  {...form.register("liveUrl")}
                />
              </FormField>
            </div>
          </div>
        </section>

        <section
          className={styles.formSection}
          aria-labelledby="project-technology"
        >
          <header className={styles.sectionHeader}>
            <span>03</span>
            <div>
              <h2 id="project-technology">Technology</h2>
              <p>Separate each technology with a comma.</p>
            </div>
          </header>

          <div className={styles.fields}>
            <FormField
              label="Technologies"
              htmlFor="project-technologies"
              error={errors.technologies?.message}
              errorId="project-technologies-error"
            >
              <Input
                id="project-technologies"
                placeholder="React, TypeScript, ASP.NET Core"
                aria-invalid={Boolean(errors.technologies)}
                aria-describedby={
                  errors.technologies ? "project-technologies-error" : undefined
                }
                {...form.register("technologies")}
              />
            </FormField>
          </div>
        </section>
      </div>

      <aside className={styles.sideColumn}>
        <section
          className={styles.previewSection}
          aria-labelledby="project-preview"
        >
          <header>
            <h2 id="project-preview">Preview</h2>
            <span>Image</span>
          </header>
          <div className={styles.preview}>
            {imageUrl && failedPreviewUrl !== imageUrl ? (
              <img
                src={imageUrl}
                alt=""
                onError={() => setFailedPreviewUrl(imageUrl)}
              />
            ) : (
              <span>
                <ImageIcon aria-hidden="true" />
                Image preview
              </span>
            )}
          </div>
          <strong>{title || "Untitled project"}</strong>
        </section>

        <section
          className={styles.settingsSection}
          aria-labelledby="project-settings"
        >
          <header>
            <h2 id="project-settings">Publishing</h2>
            <p>Control the initial position and visibility.</p>
          </header>

          <FormField
            label="Display order"
            htmlFor="project-sort-order"
            error={errors.sortOrder?.message}
            errorId="project-sort-order-error"
          >
            <Input
              id="project-sort-order"
              type="number"
              min={0}
              aria-invalid={Boolean(errors.sortOrder)}
              aria-describedby={
                errors.sortOrder ? "project-sort-order-error" : undefined
              }
              {...form.register("sortOrder", { valueAsNumber: true })}
            />
          </FormField>

          <label className={styles.publishToggle}>
            <input type="checkbox" {...form.register("isPublished")} />
            <span aria-hidden="true" />
            <span>
              <strong>Publish immediately</strong>
              <small>Make this project visible after creation.</small>
            </span>
          </label>
        </section>

        {error && (
          <Alert className={styles.alert} variant="error">
            {error}
          </Alert>
        )}

        <div className={styles.actions}>
          <Link className={styles.cancel} to="/admin/projects">
            Cancel
          </Link>
          <Button type="submit" disabled={isPending} fullWidth>
            <span>{isPending ? "Creating project" : "Create project"}</span>
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
