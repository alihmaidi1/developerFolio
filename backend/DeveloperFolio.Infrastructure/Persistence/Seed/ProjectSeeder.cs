using DeveloperFolio.Domain.Projects;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace DeveloperFolio.Infrastructure.Persistence.Seed;

internal sealed class ProjectSeeder(
    ApplicationDbContext dbContext,
    ILogger<ProjectSeeder> logger)
{
    public async Task SeedAsync(CancellationToken cancellationToken = default)
    {
        var projectsExist = await dbContext.Projects
            .AsNoTracking()
            .AnyAsync(cancellationToken);

        if (projectsExist)
        {
            logger.LogInformation("Project seed skipped because projects already exist");
            return;
        }

        var projects = CreateProjects();
        await dbContext.Projects.AddRangeAsync(projects, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);

        logger.LogInformation("Seeded {ProjectCount} portfolio projects", projects.Count);
    }

    private static IReadOnlyCollection<PortfolioProject> CreateProjects() =>
    [
        PortfolioProject.Create(
            "Developer Portfolio",
            "A focused portfolio and administration workspace for presenting selected software projects.",
            "A full-stack portfolio built with a React administration experience and an ASP.NET Core API. It includes secure admin authentication, project publishing, and content ordering.",
            "https://placehold.co/1200x800/eeedff/514fc3?text=Developer+Portfolio",
            "https://github.com/example/developer-portfolio",
            "https://portfolio.example.com",
            ["React", "TypeScript", "ASP.NET Core", "PostgreSQL"],
            0,
            true),
        PortfolioProject.Create(
            "German Learning Platform",
            "An interactive learning workspace for building German vocabulary and practicing language skills.",
            "The platform organizes lessons, vocabulary exercises, and progress into a calm learning flow designed for daily practice.",
            "https://placehold.co/1200x800/eaf4ff/2e6f9e?text=German+Learning",
            "https://github.com/example/german-learning-platform",
            "https://german.example.com",
            ["React", "Redux Toolkit", "React Query", "TypeScript"],
            1,
            true),
        PortfolioProject.Create(
            "School Management System",
            "A modular school administration system for students, classes, attendance, and academic records.",
            "A role-based management system that keeps core school operations organized across dedicated application modules.",
            "https://placehold.co/1200x800/eaf8f2/287a59?text=School+Management",
            "https://github.com/example/school-management-system",
            null,
            ["ASP.NET Core", "Entity Framework Core", "PostgreSQL", "React"],
            2,
            true),
        PortfolioProject.Create(
            "Chunk Upload Service",
            "A resilient large-file upload service with resumable chunks and reliable progress tracking.",
            "The service splits large files into manageable chunks, supports interrupted upload recovery, and combines completed uploads safely on the server.",
            "https://placehold.co/1200x800/fff2e7/b86b2e?text=Chunk+Upload",
            "https://github.com/example/chunk-upload-service",
            null,
            ["ASP.NET Core", "C#", "React", "Axios"],
            3,
            true),
        PortfolioProject.Create(
            "Food Ordering Experience",
            "A responsive food ordering interface designed around quick discovery and a simple checkout flow.",
            "A customer-facing application for exploring restaurants, configuring meals, and managing an order through a streamlined interface.",
            "https://placehold.co/1200x800/fff0f1/b54f62?text=Food+Ordering",
            "https://github.com/example/food-ordering-app",
            "https://food.example.com",
            ["React", "TypeScript", "React Hook Form", "Zod"],
            4,
            true),
        PortfolioProject.Create(
            "Developer Roadmap Planner",
            "A planning tool for turning technical goals into structured learning milestones.",
            "The roadmap planner helps developers arrange topics, track progress, and keep practical learning goals visible over time.",
            "https://placehold.co/1200x800/f2eff8/7657a6?text=Roadmap+Planner",
            "https://github.com/example/developer-roadmap",
            null,
            ["React", "TypeScript", "Redux Toolkit"],
            5,
            false),
    ];
}
