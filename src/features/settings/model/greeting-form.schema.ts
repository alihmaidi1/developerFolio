import { z } from "zod";

const optionalUrl = z
  .string()
  .trim()
  .max(2048, "URL cannot exceed 2048 characters.")
  .refine((value) => {
    if (!value) return true;
    try {
      const url = new URL(value);
      return url.protocol === "http:" || url.protocol === "https:";
    } catch {
      return false;
    }
  }, "Enter a valid HTTP or HTTPS URL.");

export const greetingFormSchema = z.object({
  username: z
    .string()
    .trim()
    .min(1, "Username is required.")
    .max(120, "Username cannot exceed 120 characters."),
  title: z
    .string()
    .trim()
    .min(1, "Title is required.")
    .max(200, "Title cannot exceed 200 characters."),
  subTitle: z
    .string()
    .trim()
    .min(1, "Subtitle is required.")
    .max(2000, "Subtitle cannot exceed 2000 characters."),
  resumeUrl: optionalUrl,
  displayGreeting: z.boolean(),
});

export type GreetingFormValues = z.infer<typeof greetingFormSchema>;
