export interface AdminWorkExperience {
  id: string;
  role: string;
  company: string;
  date: string;
  description: string | null;
  companyLogoUrl: string | null;
  descriptionBullets: string[];
  sortOrder: number;
  isPublished: boolean;
  createdAtUtc: string;
  updatedAtUtc: string;
}

export type WorkExperienceOrderDirection = "up" | "down";

export interface ReorderWorkExperienceRequest {
  workExperienceId: string;
  direction: WorkExperienceOrderDirection;
}
