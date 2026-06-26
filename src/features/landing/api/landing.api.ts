import { publicApi } from "@/shared/lib/public-api";
import { unwrapOperationResult } from "@/shared/lib/operation-result";
import type { TResult } from "@/shared/types/api.types";

/* ============================================================================
   Shared types (mirrors backend public DTOs)
   ============================================================================ */

export interface LandingGreeting {
  username: string;
  title: string;
  subTitle: string;
  resumeUrl: string | null;
  displayGreeting: boolean;
}

export interface LandingContact {
  title: string;
  subtitle: string;
  email: string | null;
  phone: string | null;
  address: string | null;
}

export interface LandingSocialLink {
  id: string;
  name: string;
  url: string;
  iconClassName: string;
}

export interface LandingSettings {
  greeting: LandingGreeting;
  contact: LandingContact;
  socialLinks: LandingSocialLink[];
}

export interface LandingSkillStatement {
  id: string;
  text: string;
}

export interface LandingSoftwareSkill {
  id: string;
  name: string;
  iconClassName: string;
}

export interface LandingSkills {
  statements: LandingSkillStatement[];
  softwareSkills: LandingSoftwareSkill[];
}

export interface LandingEducation {
  id: string;
  schoolName: string;
  degree: string;
  duration: string;
  description: string | null;
  logoUrl: string | null;
  descriptionBullets: string[];
}

export interface LandingExperience {
  id: string;
  role: string;
  company: string;
  date: string;
  description: string | null;
  companyLogoUrl: string | null;
  descriptionBullets: string[];
}

export interface LandingProject {
  id: string;
  title: string;
  summary: string;
  description: string | null;
  imageUrl: string | null;
  repositoryUrl: string | null;
  liveUrl: string | null;
  technologies: string[];
}

/* ============================================================================
   Routes + fetchers
   ============================================================================ */

const ROUTES = {
  settings: "/api/portfolio-settings",
  skills: "/api/skills",
  education: "/api/education",
  workExperience: "/api/work-experience",
  projects: "/api/projects",
} as const;

export async function fetchLandingSettings(): Promise<LandingSettings> {
  const result = await publicApi.get<TResult<LandingSettings>>(ROUTES.settings);
  return unwrapOperationResult(result);
}

export async function fetchLandingSkills(): Promise<LandingSkills> {
  const result = await publicApi.get<TResult<LandingSkills>>(ROUTES.skills);
  return unwrapOperationResult(result);
}

export async function fetchLandingEducation(): Promise<LandingEducation[]> {
  const result = await publicApi.get<TResult<LandingEducation[]>>(
    ROUTES.education,
  );
  return unwrapOperationResult(result);
}

export async function fetchLandingExperience(): Promise<LandingExperience[]> {
  const result = await publicApi.get<TResult<LandingExperience[]>>(
    ROUTES.workExperience,
  );
  return unwrapOperationResult(result);
}

export async function fetchLandingProjects(): Promise<LandingProject[]> {
  const result = await publicApi.get<TResult<LandingProject[]>>(
    ROUTES.projects,
  );
  return unwrapOperationResult(result);
}
