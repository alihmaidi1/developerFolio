import { useQuery } from "@tanstack/react-query";
import {
  fetchLandingEducation,
  fetchLandingExperience,
  fetchLandingProjects,
  fetchLandingSettings,
  fetchLandingSkills,
} from "../api/landing.api";

const STALE_TIME = 60_000;

export function useLandingSettings() {
  return useQuery({
    queryKey: ["landing", "settings"],
    queryFn: fetchLandingSettings,
    staleTime: STALE_TIME,
  });
}

export function useLandingSkills() {
  return useQuery({
    queryKey: ["landing", "skills"],
    queryFn: fetchLandingSkills,
    staleTime: STALE_TIME,
  });
}

export function useLandingEducation() {
  return useQuery({
    queryKey: ["landing", "education"],
    queryFn: fetchLandingEducation,
    staleTime: STALE_TIME,
  });
}

export function useLandingExperience() {
  return useQuery({
    queryKey: ["landing", "experience"],
    queryFn: fetchLandingExperience,
    staleTime: STALE_TIME,
  });
}

export function useLandingProjects() {
  return useQuery({
    queryKey: ["landing", "projects"],
    queryFn: fetchLandingProjects,
    staleTime: STALE_TIME,
  });
}
