export interface PortfolioGreeting {
  username: string;
  title: string;
  subTitle: string;
  resumeUrl: string | null;
  displayGreeting: boolean;
}

export interface PortfolioContact {
  title: string;
  subtitle: string;
  email: string | null;
  phone: string | null;
  address: string | null;
}

export interface PortfolioSocialLink {
  id: string;
  name: string;
  url: string;
  iconClassName: string;
}

export interface PortfolioSettingsResponse {
  greeting: PortfolioGreeting;
  contact: PortfolioContact;
  socialLinks: PortfolioSocialLink[];
}

export interface PublishedProject {
  id: string;
  title: string;
  summary: string;
  description: string | null;
  imageUrl: string | null;
  repositoryUrl: string | null;
  liveUrl: string | null;
  technologies: string[];
}

export interface PublishedWorkExperience {
  id: string;
  role: string;
  company: string;
  date: string;
  description: string | null;
  companyLogoUrl: string | null;
  descriptionBullets: string[];
}

export interface PublishedSkillStatement {
  id: string;
  text: string;
}

export interface PublishedSoftwareSkill {
  id: string;
  name: string;
  iconClassName: string;
}

export interface PublishedSkills {
  statements: PublishedSkillStatement[];
  softwareSkills: PublishedSoftwareSkill[];
}

export interface PublishedEducation {
  id: string;
  schoolName: string;
  degree: string;
  duration: string;
  description: string | null;
  logoUrl: string | null;
  descriptionBullets: string[];
}

export interface LandingPageResponse {
  settings: PortfolioSettingsResponse;
  projects: PublishedProject[];
  skills: PublishedSkills;
  educations: PublishedEducation[];
  workExperiences: PublishedWorkExperience[];
}
