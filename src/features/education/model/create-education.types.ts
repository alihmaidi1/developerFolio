export interface CreateEducationRequest {
  schoolName: string;
  degree: string;
  duration: string;
  description: string | null;
  logoUrl: string | null;
  descriptionBullets: string[];
  isPublished: boolean;
}
