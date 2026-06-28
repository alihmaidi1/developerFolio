import { z } from "zod";

export const WORK_EXPERIENCE_LOGO_MAX_BYTES = 5 * 1024 * 1024;
export const WORK_EXPERIENCE_LOGO_ALLOWED_TYPES = [
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
      WORK_EXPERIENCE_LOGO_ALLOWED_TYPES.includes(
        file.type as (typeof WORK_EXPERIENCE_LOGO_ALLOWED_TYPES)[number],
      ),
    "Logo must be PNG, JPEG, WEBP, GIF, or SVG.",
  )
  .refine(
    (file) => !file || file.size <= WORK_EXPERIENCE_LOGO_MAX_BYTES,
    "Logo must not exceed 5 MB.",
  );

export const workExperienceFormSchema = z.object({
  role: z
    .string()
    .trim()
    .min(1, "Role is required.")
    .max(200, "Role cannot exceed 200 characters."),
  company: z
    .string()
    .trim()
    .min(1, "Company is required.")
    .max(200, "Company cannot exceed 200 characters."),
  date: z
    .string()
    .trim()
    .min(1, "Date range is required.")
    .max(120, "Date cannot exceed 120 characters."),
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

export type WorkExperienceFormValues = z.infer<typeof workExperienceFormSchema>;
