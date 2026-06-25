import { z } from "zod";

export const socialLinkFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required.")
    .max(80, "Name cannot exceed 80 characters."),
  url: z
    .string()
    .trim()
    .min(1, "URL is required.")
    .max(2048, "URL cannot exceed 2048 characters."),
  iconClassName: z
    .string()
    .trim()
    .min(1, "Icon class is required.")
    .max(160, "Icon class cannot exceed 160 characters."),
  isPublished: z.boolean(),
});

export type SocialLinkFormValues = z.infer<typeof socialLinkFormSchema>;
