import { z } from "zod";

export const skillStatementFormSchema = z.object({
  text: z
    .string()
    .trim()
    .min(1, "Statement is required.")
    .max(500, "Statement cannot exceed 500 characters."),
  isPublished: z.boolean(),
});

export type SkillStatementFormValues = z.infer<typeof skillStatementFormSchema>;
