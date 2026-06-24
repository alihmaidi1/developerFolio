import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { resolveApiError } from "@/shared/lib/api-error";
import type { AdminProject } from "../model/project.types";
import { projectsQueryKeys } from "../model/projects.query-keys";
import {
  parseTechnologies,
  projectFormSchema,
  type ProjectFormValues,
} from "../model/project-form.schema";
import { updateProject } from "../api/update-project.api";
import { uploadProjectImage } from "../api/upload-project-image.api";

export function useUpdateProjectForm(project: AdminProject) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const updateMutation = useMutation({
    mutationFn: async (values: ProjectFormValues) => {
      const imageUrl = values.imageFile
        ? await uploadProjectImage(values.imageFile)
        : project.imageUrl;

      return updateProject({
        projectId: project.id,
        request: {
          title: values.title,
          summary: values.summary,
          description: values.description || null,
          imageUrl,
          repositoryUrl: values.repositoryUrl || null,
          liveUrl: values.liveUrl || null,
          technologies: parseTechnologies(values.technologies),
          isPublished: values.isPublished,
        },
      });
    },
  });

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      title: project.title,
      summary: project.summary,
      description: project.description ?? "",
      imageFile: null,
      repositoryUrl: project.repositoryUrl ?? "",
      liveUrl: project.liveUrl ?? "",
      technologies: project.technologies.join(", "),
      isPublished: project.isPublished,
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    updateMutation.reset();

    try {
      await updateMutation.mutateAsync(values);
      await queryClient.invalidateQueries({ queryKey: projectsQueryKeys.all });
      navigate("/admin/projects", { replace: true });
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
    existingImageUrl: project.imageUrl,
  };
}
