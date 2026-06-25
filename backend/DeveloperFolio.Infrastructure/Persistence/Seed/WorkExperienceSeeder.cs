using DeveloperFolio.Domain.WorkExperience;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace DeveloperFolio.Infrastructure.Persistence.Seed;

internal sealed class WorkExperienceSeeder(
    ApplicationDbContext dbContext,
    ILogger<WorkExperienceSeeder> logger)
{
    public async Task SeedAsync(CancellationToken cancellationToken = default)
    {
        var entriesExist = await dbContext.WorkExperienceEntries
            .AsNoTracking()
            .AnyAsync(cancellationToken);

        if (entriesExist)
        {
            logger.LogInformation("Work experience seed skipped because entries already exist");
            return;
        }

        var entries = CreateEntries();
        await dbContext.WorkExperienceEntries.AddRangeAsync(entries, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);

        logger.LogInformation("Seeded {WorkExperienceCount} work experience entries", entries.Count);
    }

    private static IReadOnlyCollection<WorkExperienceEntry> CreateEntries() =>
    [
        WorkExperienceEntry.Create(
            "Senior Full-Stack Engineer",
            "Meta",
            "March 2022 - Present",
            "Leading initiatives across the news feed platform with a focus on reliability, performance, and developer experience.",
            "https://placehold.co/256x256/eef3ff/1877f2?text=Meta",
            [
                "Led the migration of a legacy ranking pipeline to a streaming architecture, cutting end-to-end latency by 42%.",
                "Mentored four engineers through their first production launches and led the platform's onboarding guild.",
                "Designed an internal feature-flag tooling adopted by 8 squads across the organization.",
            ],
            0,
            true),
        WorkExperienceEntry.Create(
            "Full-Stack Engineer",
            "Stripe",
            "August 2020 - February 2022",
            "Built core merchant dashboards and revenue tooling used by hundreds of thousands of businesses worldwide.",
            "https://placehold.co/256x256/f0eefb/635bff?text=Stripe",
            [
                "Shipped the unified payments dashboard handling 1M+ daily active sessions.",
                "Owned the React component library used across 12 merchant-facing surfaces.",
                "Reduced p95 dashboard load time from 2.8s to 1.1s through targeted SSR and code splitting.",
            ],
            1,
            true),
        WorkExperienceEntry.Create(
            "Front-End Developer",
            "Quora",
            "May 2018 - July 2020",
            "Worked across the answer reading experience and improved performance for high-traffic pages.",
            "https://placehold.co/256x256/fff0f0/b92b27?text=Quora",
            [
                "Cut perceived load time by 35% on the answer page through resource hints and progressive hydration.",
                "Migrated the legacy comments stack to a modern React + GraphQL architecture.",
            ],
            2,
            true),
        WorkExperienceEntry.Create(
            "Software Engineer Intern",
            "Airbnb",
            "Jan 2018 - May 2018",
            "Contributed to the search ranking experimentation framework during a research-focused internship.",
            "https://placehold.co/256x256/ffe8eb/ff5a5f?text=Airbnb",
            [
                "Shipped an analytics dashboard adopted by the entire search team.",
                "Wrote two internal RFCs that informed the team's A/B testing roadmap.",
            ],
            3,
            true),
    ];
}
