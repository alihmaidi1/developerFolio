import { z } from "zod";

export const contactFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required.")
    .max(200, "Title cannot exceed 200 characters."),
  subtitle: z
    .string()
    .trim()
    .min(1, "Subtitle is required.")
    .max(1000, "Subtitle cannot exceed 1000 characters."),
  email: z
    .string()
    .trim()
    .max(200, "Email cannot exceed 200 characters.")
    .refine(
      (value) => !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      "Enter a valid email address.",
    ),
  phone: z.string().trim().max(80, "Phone cannot exceed 80 characters."),
  address: z.string().trim().max(300, "Address cannot exceed 300 characters."),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
