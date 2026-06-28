import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { resolveApiError } from "@/shared/lib/api-error";
import { updateWorkExperience } from "../api/update-work-experience.api";
import { uploadWorkExperienceLogo } from "../api/upload-work-experience-logo.api";
import type { AdminWorkExperience } from "../model/work-experience.types";
import {
  workExperienceFormSchema,
  type WorkExperienceFormValues,
} from "../model/work-experience-form.schema";
import { workExperienceQueryKeys } from "../model/work-experience.query-keys";

export function useUpdateWorkExperienceForm(entry: AdminWorkExperience) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const updateMutation = useMutation({
    mutationFn: async (values: WorkExperienceFormValues) => {
      const companyLogoUrl = values.logoFile
        ? await uploadWorkExperienceLogo(values.logoFile)
        : entry.companyLogoUrl;

      return updateWorkExperience({
        workExperienceId: entry.id,
        request: {
          role: values.role,
          company: values.company,
          date: values.date,
          description: values.description || null,
          companyLogoUrl,
          descriptionBullets: values.descriptionBullets
            .map((bullet) => bullet.trim())
            .filter(Boolean),
          isPublished: values.isPublished,
        },
      });
    },
  });

  const form = useForm<WorkExperienceFormValues>({
    resolver: zodResolver(workExperienceFormSchema),
    defaultValues: {
      role: entry.role,
      company: entry.company,
      date: entry.date,
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
      await queryClient.invalidateQueries({
        queryKey: workExperienceQueryKeys.all,
      });
      navigate("/admin/work-experience", { replace: true });
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
    existingLogoUrl: entry.companyLogoUrl,
  };
}
