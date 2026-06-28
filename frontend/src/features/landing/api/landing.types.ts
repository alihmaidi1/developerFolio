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
