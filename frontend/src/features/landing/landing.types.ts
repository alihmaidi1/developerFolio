export interface LandingHero {
  badge: string;
  name: string;
  title: string;
  summary: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  resumeCta?: { label: string; href: string };
  techStack: string[];
}

export interface LandingSoftwareSkill {
  id: string;
  name: string;
  iconClassName: string;
}

export interface LandingProject {
  id: string;
  title: string;
  description: string;
  tech: string[];
  href?: string;
  highlight?: string;
}

export interface LandingCareerStep {
  id: string;
  period: string;
  role: string;
  org: string;
  body: string;
  tech: string[];
}

export interface LandingContact {
  title: string;
  subtitle: string;
  status: string;
  email: string;
  phone: string;
  address: string;
  ctaLabel: string;
}

export interface LandingSocialLink {
  label: string;
  href: string;
  iconClassName?: string;
}

export interface LandingEducation {
  id: string;
  school: string;
  degree: string;
  period: string;
  description: string;
  bullets: string[];
}

export interface LandingPageData {
  hero: LandingHero;
  capabilities: string[];
  skills: LandingSoftwareSkill[];
  projects: LandingProject[];
  career: LandingCareerStep[];
  education: LandingEducation[];
  contact: LandingContact;
  social: LandingSocialLink[];
}
