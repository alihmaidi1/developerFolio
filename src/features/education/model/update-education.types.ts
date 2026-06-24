export interface UpdateEducationRequest {
  schoolName: string;
  degree: string;
  duration: string;
  description: string | null;
  logoUrl: string | null;
  descriptionBullets: string[];
  isPublished: boolean;
}

export interface UpdateEducationVariables {
  educationId: string;
  request: UpdateEducationRequest;
}
