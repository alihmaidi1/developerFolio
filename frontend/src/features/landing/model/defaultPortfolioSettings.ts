import type { PortfolioSettingsResponse } from "../api/landing.types";

export const defaultPortfolioSettings: PortfolioSettingsResponse = {
  greeting: {
    username: "David Heckhoff",
    title: "Creative Developer",
    subTitle: "",
    resumeUrl: null,
    displayGreeting: true,
  },
  contact: {
    title: "Let's work together!",
    subtitle: "",
    email: null,
    phone: null,
    address: null,
  },
  socialLinks: [],
};
