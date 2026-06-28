import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { resolveApiError } from "@/shared/lib/api-error";
import { projectsQueryKeys } from "../model/projects.query-keys";
import {
  parseTechnologies,
  projectFormSchema,
  type ProjectFormValues,
} from "../model/project-form.schema";
import { createProject } from "../api/create-project.api";
import { uploadProjectImage } from "../api/upload-project-image.api";

export function useCreateProjectForm() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const createMutation = useMutation({
    mutationFn: async (values: ProjectFormValues) => {
      const imageUrl = values.imageFile
        ? await uploadProjectImage(values.imageFile)
        : null;

      return createProject({
        title: values.title,
        summary: values.summary,
        description: values.description || null,
        imageUrl,
        repositoryUrl: values.repositoryUrl || null,
        liveUrl: values.liveUrl || null,
        technologies: parseTechnologies(values.technologies),
        isPublished: values.isPublished,
      });
    },
  });

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      title: "",
      summary: "",
      description: "",
      imageFile: null,
      repositoryUrl: "",
      liveUrl: "",
      technologies: "",
      isPublished: false,
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    createMutation.reset();

    try {
      await createMutation.mutateAsync(values);
      await queryClient.invalidateQueries({ queryKey: projectsQueryKeys.all });
      navigate("/admin/projects", { replace: true });
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
    existingImageUrl: null,
  };
}
