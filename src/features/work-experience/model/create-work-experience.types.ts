export interface CreateWorkExperienceRequest {
  role: string;
  company: string;
  date: string;
  description: string | null;
  companyLogoUrl: string | null;
  descriptionBullets: string[];
  isPublished: boolean;
}
