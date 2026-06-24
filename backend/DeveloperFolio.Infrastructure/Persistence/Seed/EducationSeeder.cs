using DeveloperFolio.Domain.Education;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace DeveloperFolio.Infrastructure.Persistence.Seed;

internal sealed class EducationSeeder(
    ApplicationDbContext dbContext,
    ILogger<EducationSeeder> logger)
{
    public async Task SeedAsync(CancellationToken cancellationToken = default)
    {
        var entriesExist = await dbContext.EducationEntries
            .AsNoTracking()
            .AnyAsync(cancellationToken);

        if (entriesExist)
        {
            logger.LogInformation("Education seed skipped because entries already exist");
            return;
        }

        var entries = CreateEntries();
        await dbContext.EducationEntries.AddRangeAsync(entries, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);

        logger.LogInformation("Seeded {EducationCount} education entries", entries.Count);
    }

    private static IReadOnlyCollection<EducationEntry> CreateEntries() =>
    [
        EducationEntry.Create(
            "Harvard University",
            "Master of Science in Computer Science",
            "September 2017 - April 2019",
            "Focused on distributed systems, applied machine learning, and software engineering at scale.",
            "https://placehold.co/256x256/eeedff/514fc3?text=Harvard",
            [
                "Published 3 papers on distributed scheduling.",
                "Teaching assistant for the graduate Algorithms course.",
            ],
            0,
            true),
        EducationEntry.Create(
            "Stanford University",
            "Bachelor of Science in Computer Science",
            "September 2013 - April 2017",
            "Ranked top 10% of the program with a focus on software engineering, web security, and operating systems.",
            "https://placehold.co/256x256/eaf4ff/2e6f9e?text=Stanford",
            [
                "Led the student-run web platform improvement guild.",
                "Built a course-recommendation tool used by 1k+ students.",
            ],
            1,
            true),
    ];
}
