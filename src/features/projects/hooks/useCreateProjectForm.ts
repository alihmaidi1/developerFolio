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

export function useCreateProjectForm() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const createMutation = useMutation({ mutationFn: createProject });
  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      title: "",
      summary: "",
      description: "",
      imageUrl: "",
      repositoryUrl: "",
      liveUrl: "",
      technologies: "",
      isPublished: false,
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    createMutation.reset();

    try {
      await createMutation.mutateAsync({
        title: values.title,
        summary: values.summary,
        description: values.description || null,
        imageUrl: values.imageUrl || null,
        repositoryUrl: values.repositoryUrl || null,
        liveUrl: values.liveUrl || null,
        technologies: parseTechnologies(values.technologies),
        isPublished: values.isPublished,
      });

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
  };
}
