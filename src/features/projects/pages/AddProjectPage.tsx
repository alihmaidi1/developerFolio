import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { resolveApiError } from "@/shared/lib/api-error";
import { AddProjectForm } from "../components/add-project-form/AddProjectForm";
import { useCreateProject } from "../hooks/useCreateProject";
import {
  createProjectSchema,
  parseTechnologies,
  type CreateProjectFormValues,
} from "../model/create-project.schema";
import { projectsQueryKeys } from "../model/projects.query-keys";
import styles from "./AddProjectPage.module.css";

export function AddProjectPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const createProject = useCreateProject();
  const form = useForm<CreateProjectFormValues>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      title: "",
      summary: "",
      description: "",
      imageUrl: "",
      repositoryUrl: "",
      liveUrl: "",
      technologies: "",
      sortOrder: 0,
      isPublished: false,
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    createProject.reset();

    try {
      await createProject.mutateAsync({
        title: values.title,
        summary: values.summary,
        description: values.description || null,
        imageUrl: values.imageUrl || null,
        repositoryUrl: values.repositoryUrl || null,
        liveUrl: values.liveUrl || null,
        technologies: parseTechnologies(values.technologies),
        sortOrder: values.sortOrder,
        isPublished: values.isPublished,
      });

      await queryClient.invalidateQueries({ queryKey: projectsQueryKeys.all });
      navigate("/admin/projects", { replace: true });
    } catch {
      return;
    }
  });

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <Link to="/admin/projects" className={styles.backLink}>
          <ArrowLeft aria-hidden="true" />
          Projects
        </Link>
        <p className={styles.eyebrow}>New project</p>
        <h1>Add project</h1>
        <p className={styles.intro}>
          Add the content, links, and publishing details for a portfolio
          project.
        </p>
      </header>

      <AddProjectForm
        form={form}
        onSubmit={onSubmit}
        onChange={() => createProject.reset()}
        isPending={createProject.isPending}
        error={
          createProject.isError ? resolveApiError(createProject.error) : null
        }
      />
    </section>
  );
}
