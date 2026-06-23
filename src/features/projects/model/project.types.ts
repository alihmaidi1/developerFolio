export interface AdminProject {
  id: string;
  title: string;
  summary: string;
  description: string | null;
  imageUrl: string | null;
  repositoryUrl: string | null;
  liveUrl: string | null;
  technologies: string[];
  sortOrder: number;
  isPublished: boolean;
  createdAtUtc: string;
  updatedAtUtc: string;
}

export type ProjectOrderDirection = "up" | "down";

export interface ReorderProjectRequest {
  projectId: string;
  direction: ProjectOrderDirection;
}
