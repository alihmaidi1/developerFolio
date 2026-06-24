import { z } from "zod";

export const EDUCATION_LOGO_MAX_BYTES = 5 * 1024 * 1024;
export const EDUCATION_LOGO_ALLOWED_TYPES = [
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/gif",
  "image/svg+xml",
] as const;

const logoFileSchema = z
  .union([z.instanceof(File), z.null()])
  .optional()
  .refine(
    (file) =>
      !file ||
      EDUCATION_LOGO_ALLOWED_TYPES.includes(
        file.type as (typeof EDUCATION_LOGO_ALLOWED_TYPES)[number],
      ),
    "Logo must be PNG, JPEG, WEBP, GIF, or SVG.",
  )
  .refine(
    (file) => !file || file.size <= EDUCATION_LOGO_MAX_BYTES,
    "Logo must not exceed 5 MB.",
  );

export const educationFormSchema = z.object({
  schoolName: z
    .string()
    .trim()
    .min(1, "School name is required.")
    .max(200, "School name cannot exceed 200 characters."),
  degree: z
    .string()
    .trim()
    .min(1, "Degree is required.")
    .max(200, "Degree cannot exceed 200 characters."),
  duration: z
    .string()
    .trim()
    .min(1, "Duration is required.")
    .max(120, "Duration cannot exceed 120 characters."),
  description: z
    .string()
    .trim()
    .max(2000, "Description cannot exceed 2000 characters."),
  logoFile: logoFileSchema,
  descriptionBullets: z
    .array(
      z.string().trim().max(300, "Each bullet cannot exceed 300 characters."),
    )
    .max(10, "An entry can contain at most 10 bullets."),
  isPublished: z.boolean(),
});

export type EducationFormValues = z.infer<typeof educationFormSchema>;
