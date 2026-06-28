import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { resolveApiError } from "@/shared/lib/api-error";
import { createEducation } from "../api/create-education.api";
import { uploadEducationLogo } from "../api/upload-education-logo.api";
import {
  educationFormSchema,
  type EducationFormValues,
} from "../model/education-form.schema";
import { educationQueryKeys } from "../model/education.query-keys";

export function useCreateEducationForm() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const createMutation = useMutation({
    mutationFn: async (values: EducationFormValues) => {
      const logoUrl = values.logoFile
        ? await uploadEducationLogo(values.logoFile)
        : null;

      return createEducation({
        schoolName: values.schoolName,
        degree: values.degree,
        duration: values.duration,
        description: values.description || null,
        logoUrl,
        descriptionBullets: values.descriptionBullets
          .map((bullet) => bullet.trim())
          .filter(Boolean),
        isPublished: values.isPublished,
      });
    },
  });

  const form = useForm<EducationFormValues>({
    resolver: zodResolver(educationFormSchema),
    defaultValues: {
      schoolName: "",
      degree: "",
      duration: "",
      description: "",
      logoFile: null,
      descriptionBullets: [],
      isPublished: false,
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    createMutation.reset();

    try {
      await createMutation.mutateAsync(values);
      await queryClient.invalidateQueries({ queryKey: educationQueryKeys.all });
      navigate("/admin/education", { replace: true });
    } catch {
      return;
    }
  });

  return {
    form,
    onSubmit,
    onChange: () => createMutation.reset(),
    isPending: createMutation.isPending,
    error: createMutation.isError
      ? resolveApiError(createMutation.error)
      : null,
    existingLogoUrl: null,
  };
}
