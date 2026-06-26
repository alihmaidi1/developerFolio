import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle, Trash2, Video } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { resolveApiError } from "@/shared/lib/api-error";
import { resolveAssetUrl } from "@/shared/lib/asset-url";
import { FormField, Input } from "@/shared/ui";
import { greetingApi } from "../../api/greeting.api";
import {
  GREETING_VIDEO_ALLOWED_TYPES,
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
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const buildDefaults = (entry: GreetingSettings): GreetingFormValues => ({
    username: entry.username,
    title: entry.title,
    subTitle: entry.subTitle,
    resumeUrl: entry.resumeUrl ?? "",
    videoFile: null,
    removeVideo: false,
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

  const videoFile = useWatch({ control: form.control, name: "videoFile" });
  const removeVideo = useWatch({ control: form.control, name: "removeVideo" });

  const localPreview = useMemo(
    () => (videoFile ? URL.createObjectURL(videoFile) : null),
    [videoFile],
  );
  useEffect(
    () => () => {
      if (localPreview) {
        URL.revokeObjectURL(localPreview);
      }
    },
    [localPreview],
  );

  const previewSrc =
    localPreview ??
    (removeVideo ? null : resolveAssetUrl(greeting.introVideoUrl));

  const mutation = useUpdateGreeting();
  const errors = form.formState.errors;

  const onSubmit = form.handleSubmit(async (values) => {
    mutation.reset();
    setUploadError(null);

    let introVideoUrl = greeting.introVideoUrl;
    try {
      if (values.videoFile) {
        setIsUploading(true);
        introVideoUrl = await greetingApi.uploadVideo(values.videoFile);
      } else if (values.removeVideo) {
        introVideoUrl = null;
      }
    } catch (error) {
      setUploadError(resolveApiError(error));
      return;
    } finally {
      setIsUploading(false);
    }

    try {
      await mutation.mutateAsync({
        username: values.username,
        title: values.title,
        subTitle: values.subTitle,
        resumeUrl: values.resumeUrl || null,
        introVideoUrl,
        displayGreeting: values.displayGreeting,
      });
      setSavedOnce(true);
      form.reset(buildDefaults({ ...greeting, introVideoUrl }));
    } catch {
      // surfaced via mutation.isError
    }
  });

  const isBusy = isUploading || mutation.isPending;

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

      <FormField
        label="Intro video"
        htmlFor="greeting-video"
        error={errors.videoFile?.message}
        errorId="greeting-video-error"
      >
        <div className={styles.videoField}>
          <div className={styles.videoPreview}>
            {previewSrc ? (
              <video
                key={previewSrc}
                className={styles.videoPlayer}
                src={previewSrc}
                muted
                playsInline
                controls
              />
            ) : (
              <span className={styles.videoEmpty}>
                <Video aria-hidden="true" />
                No video
              </span>
            )}
          </div>

          <div className={styles.videoControls}>
            <label className={styles.videoPick}>
              <Video aria-hidden="true" />
              {videoFile ? "Change video" : "Upload video"}
              <input
                id="greeting-video"
                type="file"
                accept={GREETING_VIDEO_ALLOWED_TYPES.join(",")}
                aria-invalid={Boolean(errors.videoFile)}
                aria-describedby={
                  errors.videoFile ? "greeting-video-error" : undefined
                }
                onChange={(event) => {
                  const [file] = Array.from(event.target.files ?? []);
                  form.setValue("videoFile", file ?? null, {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                  if (file) {
                    form.setValue("removeVideo", false);
                  }
                  event.target.value = "";
                }}
              />
            </label>

            {(videoFile || (greeting.introVideoUrl && !removeVideo)) && (
              <button
                type="button"
                className={styles.videoRemove}
                onClick={() => {
                  form.setValue("videoFile", null);
                  form.setValue("removeVideo", Boolean(greeting.introVideoUrl));
                }}
              >
                <Trash2 aria-hidden="true" />
                Remove
              </button>
            )}

            <small className={styles.videoHint}>
              MP4, WEBM, or MOV up to 30 MB.
            </small>
          </div>
        </div>
      </FormField>

      {(mutation.isError || uploadError) && (
        <p className={styles.alert} role="alert">
          {uploadError ?? resolveApiError(mutation.error)}
        </p>
      )}

      {!mutation.isError && !uploadError && savedOnce && !isBusy && (
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
            disabled={isBusy}
          >
            {isBusy && (
              <LoaderCircle className={styles.spinner} aria-hidden="true" />
            )}
            {isUploading ? "Uploading video" : "Save changes"}
          </button>
        </div>
      </div>
    </form>
  );
}
