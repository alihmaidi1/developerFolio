import { z } from "zod";

const optionalHttpUrl = z
  .string()
  .trim()
  .max(2048, "URL cannot exceed 2048 characters.")
  .refine((value) => {
    if (!value) {
      return true;
    }

    try {
      const url = new URL(value);
      return url.protocol === "http:" || url.protocol === "https:";
    } catch {
      return false;
    }
  }, "Enter a valid HTTP or HTTPS URL.");

function parseTechnologies(value: string): string[] {
  return value
    .split(",")
    .map((technology) => technology.trim())
    .filter(Boolean);
}

export const PROJECT_IMAGE_MAX_BYTES = 5 * 1024 * 1024;
export const PROJECT_IMAGE_ALLOWED_TYPES = [
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/gif",
] as const;

const imageFileSchema = z
  .union([z.instanceof(File), z.null()])
  .optional()
  .refine(
    (file) =>
      !file ||
      PROJECT_IMAGE_ALLOWED_TYPES.includes(
        file.type as (typeof PROJECT_IMAGE_ALLOWED_TYPES)[number],
      ),
    "Image must be PNG, JPEG, WEBP, or GIF.",
  )
  .refine(
    (file) => !file || file.size <= PROJECT_IMAGE_MAX_BYTES,
    "Image must not exceed 5 MB.",
  );

export const projectFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required.")
    .max(160, "Title cannot exceed 160 characters."),
  summary: z
    .string()
    .trim()
    .min(1, "Summary is required.")
    .max(500, "Summary cannot exceed 500 characters."),
  description: z
    .string()
    .trim()
    .max(5000, "Description cannot exceed 5000 characters."),
  imageFile: imageFileSchema,
  repositoryUrl: optionalHttpUrl,
  liveUrl: optionalHttpUrl,
  technologies: z
    .string()
    .trim()
    .refine(
      (value) => parseTechnologies(value).length <= 30,
      "A project can contain at most 30 technologies.",
    )
    .refine(
      (value) =>
        parseTechnologies(value).every((technology) => technology.length <= 80),
      "Each technology cannot exceed 80 characters.",
    ),
  isPublished: z.boolean(),
});

export type ProjectFormValues = z.infer<typeof projectFormSchema>;

export { parseTechnologies };
