// Mirrors backend LandingPageResponse (DeveloperFolio.Application.Features.LandingPage.GetLandingPage).
// Keep field names exactly aligned — backend uses System.Text.Json default casing (PascalCase
// converted to camelCase via the API's JSON options).

export interface PortfolioGreetingResponse {
  username: string;
  title: string;
  subTitle: string;
  resumeUrl: string | null;
  displayGreeting: boolean;
}

export interface PortfolioContactResponse {
  title: string;
  subtitle: string;
  email: string | null;
  phone: string | null;
  address: string | null;
}

export interface PortfolioSocialLinkResponse {
  id: string;
  name: string;
  url: string;
  iconClassName: string;
}

export interface PortfolioSettingsResponse {
  greeting: PortfolioGreetingResponse;
  contact: PortfolioContactResponse;
  socialLinks: PortfolioSocialLinkResponse[];
}

export interface PublishedProjectResponse {
  id: string;
  title: string;
  summary: string;
  description: string | null;
  imageUrl: string | null;
  repositoryUrl: string | null;
  liveUrl: string | null;
  technologies: string[];
}

export interface PublishedSkillStatementResponse {
  id: string;
  text: string;
}

export interface PublishedSoftwareSkillResponse {
  id: string;
  name: string;
  iconClassName: string;
}

export interface PublishedSkillsResponse {
  statements: PublishedSkillStatementResponse[];
  softwareSkills: PublishedSoftwareSkillResponse[];
}

export interface PublishedEducationResponse {
  id: string;
  schoolName: string;
  degree: string;
  duration: string;
  description: string | null;
  logoUrl: string | null;
  descriptionBullets: string[];
}

export interface PublishedWorkExperienceResponse {
  id: string;
  role: string;
  company: string;
  date: string;
  description: string | null;
  companyLogoUrl: string | null;
  descriptionBullets: string[];
}

export interface LandingPageResponse {
  settings: PortfolioSettingsResponse;
  projects: PublishedProjectResponse[];
  skills: PublishedSkillsResponse;
  educations: PublishedEducationResponse[];
  workExperiences: PublishedWorkExperienceResponse[];
}
