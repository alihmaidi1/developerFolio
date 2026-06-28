import { z } from "zod";

export const softwareSkillFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required.")
    .max(80, "Name cannot exceed 80 characters."),
  iconClassName: z
    .string()
    .trim()
    .min(1, "Icon class is required.")
    .max(160, "Icon class cannot exceed 160 characters."),
  isPublished: z.boolean(),
});

export type SoftwareSkillFormValues = z.infer<typeof softwareSkillFormSchema>;
