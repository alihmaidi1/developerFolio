import type { ReactNode } from "react";

export interface ExternalLink {
  name: string;
  url: string;
}

export interface AchievementCardData {
  title: string;
  description: string;
  image: string;
  imageAlt?: string;
  footer: ExternalLink[];
}

export interface BlogCardData {
  url: string;
  title: string;
  description: ReactNode;
  image?: string;
}

export interface EducationSchool {
  schoolName: string;
  logo: string;
  subHeader: string;
  duration: string;
  desc: string;
  descBullets?: string[];
}

export interface ExperienceData {
  role: string;
  company: string;
  companylogo: string;
  date: string;
  desc: string;
  descBullets?: string[];
}

export interface TalkDetails {
  title: string;
  subtitle: string;
  slides_url: string;
  event_url: string;
  isDark: boolean;
}
