export interface UpdateWorkExperienceRequest {
  role: string;
  company: string;
  date: string;
  description: string | null;
  companyLogoUrl: string | null;
  descriptionBullets: string[];
  isPublished: boolean;
}

export interface UpdateWorkExperienceVariables {
  workExperienceId: string;
  request: UpdateWorkExperienceRequest;
}
