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

export interface LandingAboutStat {
  value: string;
  label: string;
}

export interface LandingAbout {
  title: string;
  body: string;
  stats: LandingAboutStat[];
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
  status: string;
  email: string;
  location: string;
  ctaLabel: string;
}

export interface LandingSocialLink {
  label: string;
  href: string;
  iconClassName?: string;
}

export interface LandingPageData {
  hero: LandingHero;
  about: LandingAbout;
  capabilities: string[];
  skills: LandingSoftwareSkill[];
  projects: LandingProject[];
  career: LandingCareerStep[];
  contact: LandingContact;
  social: LandingSocialLink[];
}
