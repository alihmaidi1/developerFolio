export interface AdminEducation {
  id: string;
  schoolName: string;
  degree: string;
  duration: string;
  description: string | null;
  logoUrl: string | null;
  descriptionBullets: string[];
  sortOrder: number;
  isPublished: boolean;
  createdAtUtc: string;
  updatedAtUtc: string;
}

export type EducationOrderDirection = "up" | "down";

export interface ReorderEducationRequest {
  educationId: string;
  direction: EducationOrderDirection;
}
