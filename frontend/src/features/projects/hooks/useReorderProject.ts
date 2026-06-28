import { useMutation, useQueryClient } from "@tanstack/react-query";
import { projectsApi } from "../api/projects.api";
import type {
  AdminProject,
  ReorderProjectRequest,
} from "../model/project.types";
import { projectsQueryKeys } from "../model/projects.query-keys";

interface ReorderProjectContext {
  previousProjects?: AdminProject[];
}

export function useReorderProject() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, ReorderProjectRequest, ReorderProjectContext>(
    {
      mutationFn: projectsApi.reorder,
      onMutate: async ({ projectId, direction }) => {
        await queryClient.cancelQueries({ queryKey: projectsQueryKeys.list() });

        const previousProjects = queryClient.getQueryData<AdminProject[]>(
          projectsQueryKeys.list(),
        );

        if (previousProjects) {
          const currentIndex = previousProjects.findIndex(
            (project) => project.id === projectId,
          );
          const targetIndex =
            direction === "up" ? currentIndex - 1 : currentIndex + 1;

          if (
            currentIndex >= 0 &&
            targetIndex >= 0 &&
            targetIndex < previousProjects.length
          ) {
            const reorderedProjects = [...previousProjects];
            [reorderedProjects[currentIndex], reorderedProjects[targetIndex]] =
              [reorderedProjects[targetIndex], reorderedProjects[currentIndex]];

            queryClient.setQueryData<AdminProject[]>(
              projectsQueryKeys.list(),
              reorderedProjects.map((project, index) => ({
                ...project,
                sortOrder: index,
              })),
            );
          }
        }

        return { previousProjects };
      },
      onError: (_error, _variables, context) => {
        if (context?.previousProjects) {
          queryClient.setQueryData(
            projectsQueryKeys.list(),
            context.previousProjects,
          );
        }
      },
      onSettled: () =>
        queryClient.invalidateQueries({ queryKey: projectsQueryKeys.list() }),
    },
  );
}
