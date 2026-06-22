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

export interface CreateProjectRequest {
  title: string;
  summary: string;
  description: string | null;
  imageUrl: string | null;
  repositoryUrl: string | null;
  liveUrl: string | null;
  technologies: string[];
  sortOrder: number;
  isPublished: boolean;
}
