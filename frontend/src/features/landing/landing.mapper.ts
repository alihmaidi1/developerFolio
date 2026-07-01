import type { LandingPageResponse } from "./api/landing.api.types";
import type {
  LandingCareerStep,
  LandingPageData,
  LandingProject,
  LandingSocialLink,
  LandingSoftwareSkill,
} from "./landing.types";

const DEFAULT_PRIMARY_CTA = { label: "View Projects", href: "#projects" };
const DEFAULT_SECONDARY_CTA = { label: "Contact Me", href: "#contact" };
const DEFAULT_BADGE = "AVAILABLE FOR WORK";
const DEFAULT_CONTACT_CTA = "Let's Build Something";
const DEFAULT_ABOUT_TITLE = "About Me";

const TECH_KEYWORDS = [
  ".NET",
  "ASP.NET",
  "C#",
  "React",
  "TypeScript",
  "PostgreSQL",
  "SQL",
  "Docker",
  "Redis",
  "Clean Architecture",
  "CQRS",
  "MediatR",
];

/**
 * Pick up to N items for the hero tech chip row.
 * Prefer published software skill names; fall back to a curated keyword list.
 */
function pickHeroTechStack(
  response: LandingPageResponse,
  limit = 5,
): string[] {
  const names = response.skills.softwareSkills
    .map((skill) => skill.name)
    .filter(Boolean);

  if (names.length >= 3) {
    return names.slice(0, limit);
  }

  // Backfill from projects so the chip row isn't empty.
  const fromProjects = response.projects
    .flatMap((project) => project.technologies ?? [])
    .filter((tech, idx, arr) => arr.indexOf(tech) === idx);

  const merged = [...names, ...fromProjects].filter(
    (tech, idx, arr) => arr.indexOf(tech) === idx,
  );

  return merged.length > 0 ? merged.slice(0, limit) : TECH_KEYWORDS.slice(0, limit);
}

function mapSoftwareSkills(
  response: LandingPageResponse,
): LandingSoftwareSkill[] {
  return response.skills.softwareSkills.map((skill) => ({
    id: skill.id,
    name: skill.name,
    iconClassName: skill.iconClassName,
  }));
}

function mapProjects(response: LandingPageResponse): LandingProject[] {
  return response.projects.map((project) => {
    const href =
      project.liveUrl ?? project.repositoryUrl ?? undefined;
    const highlight = project.technologies.length
      ? project.technologies.slice(0, 3).join(" · ")
      : undefined;

    return {
      id: project.id,
      title: project.title,
      description: project.description ?? project.summary,
      tech: project.technologies,
      href,
      highlight,
    };
  });
}

function mapCareer(response: LandingPageResponse): LandingCareerStep[] {
  return response.workExperiences.map((entry) => {
    // Use description bullets as a compact "tech" line (max 6) when present;
    // otherwise leave empty so the section degrades cleanly.
    const tech = entry.descriptionBullets
      .map((bullet) => bullet.trim())
      .filter(Boolean)
      .slice(0, 6);

    return {
      id: entry.id,
      period: entry.date,
      role: entry.role,
      org: entry.company,
      body: entry.description ?? "",
      tech,
    };
  });
}

function mapSocial(response: LandingPageResponse): LandingSocialLink[] {
  return response.settings.socialLinks.map((link) => ({
    label: link.name,
    href: link.url,
  }));
}

function buildAboutBody(response: LandingPageResponse): string {
  return (
    response.settings.greeting.subTitle ||
    response.settings.contact.subtitle ||
    ""
  );
}

function buildCapabilities(response: LandingPageResponse): string[] {
  return response.skills.statements
    .map((statement) => statement.text.trim())
    .filter(Boolean);
}

function buildAboutStats(response: LandingPageResponse) {
  const stats: { value: string; label: string }[] = [];

  if (response.projects.length > 0) {
    stats.push({
      value: `${response.projects.length}+`,
      label: "Published Projects",
    });
  }

  if (response.workExperiences.length > 0) {
    stats.push({
      value: `${response.workExperiences.length}`,
      label: "Work Experiences",
    });
  }

  if (response.skills.softwareSkills.length > 0) {
    stats.push({
      value: `${response.skills.softwareSkills.length}+`,
      label: "Technologies",
    });
  }

  // Keep at least one stat so the card row isn't empty.
  if (stats.length === 0) {
    stats.push({ value: "Clean Code", label: "Main Focus" });
  }

  return stats;
}

export function mapLandingResponse(
  response: LandingPageResponse,
): LandingPageData {
  const { greeting, contact } = response.settings;

  return {
    hero: {
      badge: DEFAULT_BADGE,
      name: greeting.username,
      title: greeting.title,
      // Backend "subTitle" is the rich description — use as the prominent
      // tagline. We leave the smaller description empty unless there's a
      // second sentence worth splitting off.
      summary: greeting.subTitle,
      description: "",
      primaryCta: DEFAULT_PRIMARY_CTA,
      secondaryCta: DEFAULT_SECONDARY_CTA,
      techStack: pickHeroTechStack(response),
    },
    about: {
      title: DEFAULT_ABOUT_TITLE,
      body: buildAboutBody(response),
      stats: buildAboutStats(response),
    },
    capabilities: buildCapabilities(response),
    skills: mapSoftwareSkills(response),
    projects: mapProjects(response),
    career: mapCareer(response),
    contact: {
      status: "available",
      email: contact.email ?? "",
      location: contact.address ?? "",
      ctaLabel: DEFAULT_CONTACT_CTA,
    },
    social: mapSocial(response),
  };
}
