import type { LandingPageData } from "./landing.types";

export const LANDING_DEFAULT_DATA: LandingPageData = {
  hero: {
    badge: "AVAILABLE FOR WORK",
    name: "Ali Hmaidi",
    title: "Full-Stack Developer",
    summary:
      "Full-Stack Developer specializing in ASP.NET Core, React, scalable APIs, clean architecture, and modern backend systems.",
    description:
      "I build reliable, maintainable, and performance-focused web applications with a strong backend foundation and clean user interfaces.",
    primaryCta: { label: "View Projects", href: "#projects" },
    secondaryCta: { label: "Contact Me", href: "#contact" },
    resumeCta: undefined,
    techStack: [
      "ASP.NET Core",
      "React",
      "PostgreSQL",
      "Docker",
      "Clean Architecture",
    ],
  },
  about: {
    title: "About Me",
    body: "I am a full-stack developer focused on building clean, scalable, and maintainable applications. My main strength is backend development with ASP.NET Core, but I also work with React to create complete end-to-end products.",
    stats: [
      { value: "2+ Years", label: "Backend Experience" },
      { value: "10+", label: "APIs Built" },
      { value: "Clean Code", label: "Main Focus" },
    ],
  },
  capabilities: [
    "Design and ship production-grade ASP.NET Core APIs with Clean Architecture, CQRS, and MediatR.",
    "Build modern React frontends with TypeScript, GSAP-driven motion, and a strong focus on UX.",
    "Model relational data in PostgreSQL with EF Core and ship it via Docker-based environments.",
  ],
  skills: [
    {
      id: "default-aspnet",
      name: "ASP.NET",
      iconClassName: "fab fa-microsoft",
    },
    { id: "default-csharp", name: "C#", iconClassName: "fas fa-code" },
    { id: "default-react", name: "React", iconClassName: "fab fa-react" },
    { id: "default-ts", name: "TypeScript", iconClassName: "fas fa-code" },
    { id: "default-node", name: "Node.js", iconClassName: "fab fa-node-js" },
    { id: "default-html", name: "HTML5", iconClassName: "fab fa-html5" },
    { id: "default-css", name: "CSS3", iconClassName: "fab fa-css3-alt" },
    {
      id: "default-postgres",
      name: "PostgreSQL",
      iconClassName: "fas fa-database",
    },
    { id: "default-docker", name: "Docker", iconClassName: "fab fa-docker" },
    { id: "default-git", name: "Git", iconClassName: "fab fa-git-alt" },
  ],
  projects: [
    {
      id: "portfolio-api",
      title: "Developer Portfolio API",
      description:
        "A backend-driven portfolio system with projects, education, work experience, landing page settings, and social links managed from an admin dashboard.",
      tech: ["ASP.NET Core", "PostgreSQL", "Clean Architecture", "React"],
      highlight: "Backend-driven · CMS-style admin",
    },
    {
      id: "roadmap-platform",
      title: "Roadmap Platform",
      description:
        "A learning roadmap API designed with modular architecture, sections, specializations, progress tracking, validation pipeline, and scalable backend structure.",
      tech: ["ASP.NET Core", "MediatR", "EF Core", "Docker"],
      highlight: "Modular · CQRS · Containerized",
    },
    {
      id: "admin-dashboard",
      title: "Admin Dashboard",
      description:
        "A clean and responsive admin interface for managing portfolio content, authentication, and dynamic landing page data.",
      tech: ["React", "TypeScript", "CSS Modules", "REST API"],
      highlight: "Type-safe · Responsive · Modular",
    },
  ],
  career: [
    {
      id: "current",
      period: "2024 — Present",
      role: "Full-Stack Developer",
      org: "Personal & Freelance Projects",
      body: "Building production APIs with ASP.NET Core, React frontends, and clean architecture. Focus on maintainability, testability, and backend correctness.",
      tech: ["ASP.NET Core", "React", "PostgreSQL", "Docker"],
    },
    {
      id: "backend-focus",
      period: "2023 — 2024",
      role: "Backend Developer",
      org: "Independent",
      body: "Deepened expertise in CQRS, MediatR, repository patterns, and EF Core. Shipped multiple REST APIs with proper validation pipelines and operation-result handling.",
      tech: ["C#", "EF Core", "MediatR", "Swagger"],
    },
    {
      id: "foundations",
      period: "2022 — 2023",
      role: "Software Developer",
      org: "Learning Path",
      body: "Built foundations in C# / .NET, React, and database design. Started focusing on architectural patterns and writing code that scales beyond the first iteration.",
      tech: ["C#", "React", "SQL Server", "Git"],
    },
  ],
  contact: {
    status: "available",
    email: "alihmaidi095@gmail.com",
    location: "Germany",
    ctaLabel: "Let's Build Something",
  },
  social: [
    {
      label: "GitHub",
      href: "https://github.com/Alihmaidi1",
      iconClassName: "fa-brands fa-github",
    },
    {
      label: "Email",
      href: "mailto:alihmaidi095@gmail.com",
      iconClassName: "fa-solid fa-envelope",
    },
  ],
};
