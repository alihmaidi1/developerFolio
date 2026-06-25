import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { resolveApiError } from "@/shared/lib/api-error";
import { createWorkExperience } from "../api/create-work-experience.api";
import { uploadWorkExperienceLogo } from "../api/upload-work-experience-logo.api";
import {
  workExperienceFormSchema,
  type WorkExperienceFormValues,
} from "../model/work-experience-form.schema";
import { workExperienceQueryKeys } from "../model/work-experience.query-keys";

export function useCreateWorkExperienceForm() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const createMutation = useMutation({
    mutationFn: async (values: WorkExperienceFormValues) => {
      const companyLogoUrl = values.logoFile
        ? await uploadWorkExperienceLogo(values.logoFile)
        : null;

      return createWorkExperience({
        role: values.role,
        company: values.company,
        date: values.date,
        description: values.description || null,
        companyLogoUrl,
        descriptionBullets: values.descriptionBullets
          .map((bullet) => bullet.trim())
          .filter(Boolean),
        isPublished: values.isPublished,
      });
    },
  });

  const form = useForm<WorkExperienceFormValues>({
    resolver: zodResolver(workExperienceFormSchema),
    defaultValues: {
      role: "",
      company: "",
      date: "",
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
    onChange: () => createMutation.reset(),
    isPending: createMutation.isPending,
    error: createMutation.isError
      ? resolveApiError(createMutation.error)
      : null,
    existingLogoUrl: null,
  };
}
