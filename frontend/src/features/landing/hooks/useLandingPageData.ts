import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { landingApi } from "../api/landing.api";
import { LANDING_DEFAULT_DATA } from "../landing.defaults";
import { mapLandingResponse } from "../landing.mapper";
import type { LandingPageData } from "../landing.types";
import type { LandingPageResponse } from "../api/landing.api.types";

const LANDING_QUERY_KEY = ["landing-page"] as const;

interface UseLandingPageDataResult {
  data: LandingPageData;
  isLoading: boolean;
  isError: boolean;
  isUsingFallback: boolean;
}

function isValidResponse(value: unknown): value is LandingPageResponse {
  if (!value || typeof value !== "object") return false;
  const v = value as Partial<LandingPageResponse>;
  return (
    !!v.settings &&
    typeof v.settings === "object" &&
    Array.isArray(v.projects) &&
    !!v.skills &&
    Array.isArray(v.educations) &&
    Array.isArray(v.workExperiences)
  );
}

export function useLandingPageData(): UseLandingPageDataResult {
  const query = useQuery({
    queryKey: LANDING_QUERY_KEY,
    queryFn: landingApi.getLandingPage,
    retry: 0,
  });

  const mapped = useMemo<LandingPageData | null>(() => {
    if (!isValidResponse(query.data)) return null;
    try {
      return mapLandingResponse(query.data);
    } catch {
      return null;
    }
  }, [query.data]);

  const data = mapped ?? LANDING_DEFAULT_DATA;
  const isUsingFallback = data === LANDING_DEFAULT_DATA && !query.isLoading;

  return {
    data,
    isLoading: query.isLoading,
    isError: query.isError,
    isUsingFallback,
  };
}
