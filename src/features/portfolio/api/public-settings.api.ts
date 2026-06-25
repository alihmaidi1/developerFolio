import { publicApi } from "@/shared/lib/public-api";
import { unwrapOperationResult } from "@/shared/lib/operation-result";
import type { TResult } from "@/shared/types/api.types";

export interface PublishedGreeting {
  username: string;
  title: string;
  subTitle: string;
  resumeUrl: string | null;
  displayGreeting: boolean;
}

export interface PublishedContact {
  title: string;
  subtitle: string;
  email: string | null;
  phone: string | null;
  address: string | null;
}

export interface PublishedSocialLink {
  id: string;
  name: string;
  url: string;
  iconClassName: string;
}

export interface PublishedPortfolioSettings {
  greeting: PublishedGreeting;
  contact: PublishedContact;
  socialLinks: PublishedSocialLink[];
}

const PORTFOLIO_SETTINGS_ROUTE = "/api/portfolio-settings";

export async function getPublicPortfolioSettings(): Promise<PublishedPortfolioSettings> {
  const result = await publicApi.get<TResult<PublishedPortfolioSettings>>(
    PORTFOLIO_SETTINGS_ROUTE,
  );
  return unwrapOperationResult(result);
}
