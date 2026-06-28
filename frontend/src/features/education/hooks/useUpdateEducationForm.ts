import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { resolveApiError } from "@/shared/lib/api-error";
import { updateEducation } from "../api/update-education.api";
import { uploadEducationLogo } from "../api/upload-education-logo.api";
import type { AdminEducation } from "../model/education.types";
import {
  educationFormSchema,
  type EducationFormValues,
} from "../model/education-form.schema";
import { educationQueryKeys } from "../model/education.query-keys";

export function useUpdateEducationForm(entry: AdminEducation) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const updateMutation = useMutation({
    mutationFn: async (values: EducationFormValues) => {
      const logoUrl = values.logoFile
        ? await uploadEducationLogo(values.logoFile)
        : entry.logoUrl;

      return updateEducation({
        educationId: entry.id,
        request: {
          schoolName: values.schoolName,
          degree: values.degree,
          duration: values.duration,
          description: values.description || null,
          logoUrl,
          descriptionBullets: values.descriptionBullets
            .map((bullet) => bullet.trim())
            .filter(Boolean),
          isPublished: values.isPublished,
        },
      });
    },
  });

  const form = useForm<EducationFormValues>({
    resolver: zodResolver(educationFormSchema),
    defaultValues: {
      schoolName: entry.schoolName,
      degree: entry.degree,
      duration: entry.duration,
      description: entry.description ?? "",
      logoFile: null,
      descriptionBullets: entry.descriptionBullets,
      isPublished: entry.isPublished,
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    updateMutation.reset();

    try {
      await updateMutation.mutateAsync(values);
      await queryClient.invalidateQueries({ queryKey: educationQueryKeys.all });
      navigate("/admin/education", { replace: true });
    } catch {
      return;
    }
  });

  return {
    form,
    onSubmit,
    onChange: () => updateMutation.reset(),
    isPending: updateMutation.isPending,
    error: updateMutation.isError
      ? resolveApiError(updateMutation.error)
      : null,
    existingLogoUrl: entry.logoUrl,
  };
}
