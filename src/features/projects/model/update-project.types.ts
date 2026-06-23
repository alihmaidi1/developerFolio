export interface UpdateProjectRequest {
  title: string;
  summary: string;
  description: string | null;
  imageUrl: string | null;
  repositoryUrl: string | null;
  liveUrl: string | null;
  technologies: string[];
  isPublished: boolean;
}

export interface UpdateProjectVariables {
  projectId: string;
  request: UpdateProjectRequest;
}
