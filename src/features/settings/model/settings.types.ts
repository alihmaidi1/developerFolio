export interface GreetingSettings {
  username: string;
  title: string;
  subTitle: string;
  resumeUrl: string | null;
  displayGreeting: boolean;
}

export interface ContactSettings {
  title: string;
  subtitle: string;
  email: string | null;
  phone: string | null;
  address: string | null;
}

export interface AdminSocialLink {
  id: string;
  name: string;
  url: string;
  iconClassName: string;
  sortOrder: number;
  isPublished: boolean;
  createdAtUtc: string;
  updatedAtUtc: string;
}

export type SocialLinkOrderDirection = "up" | "down";

export interface ReorderSocialLinkRequest {
  socialLinkId: string;
  direction: SocialLinkOrderDirection;
}

export interface UpsertSocialLinkRequest {
  name: string;
  url: string;
  iconClassName: string;
  isPublished: boolean;
}
