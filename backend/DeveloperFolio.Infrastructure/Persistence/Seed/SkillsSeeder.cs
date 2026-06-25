using DeveloperFolio.Domain.Skills;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace DeveloperFolio.Infrastructure.Persistence.Seed;

internal sealed class SkillsSeeder(
    ApplicationDbContext dbContext,
    ILogger<SkillsSeeder> logger)
{
    public async Task SeedAsync(CancellationToken cancellationToken = default)
    {
        await SeedStatementsAsync(cancellationToken);
        await SeedSoftwareSkillsAsync(cancellationToken);
    }

    private async Task SeedStatementsAsync(CancellationToken cancellationToken)
    {
        var statementsExist = await dbContext.SkillStatements
            .AsNoTracking()
            .AnyAsync(cancellationToken);

        if (statementsExist)
        {
            logger.LogInformation("Skill statement seed skipped because rows already exist");
            return;
        }

        var statements = new[]
        {
            SkillStatement.Create(
                "Build highly interactive front-end interfaces for web and mobile applications.",
                0,
                true),
            SkillStatement.Create(
                "Design and ship production-grade ASP.NET Core APIs with clean architecture and CQRS.",
                1,
                true),
            SkillStatement.Create(
                "Set up progressive web applications (PWA) with offline support and modern build tooling.",
                2,
                true),
            SkillStatement.Create(
                "Integrate third-party platforms such as Firebase, AWS, and Stripe into product workflows.",
                3,
                true),
        };

        await dbContext.SkillStatements.AddRangeAsync(statements, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);
        logger.LogInformation("Seeded {Count} skill statements", statements.Length);
    }

    private async Task SeedSoftwareSkillsAsync(CancellationToken cancellationToken)
    {
        var skillsExist = await dbContext.SoftwareSkills
            .AsNoTracking()
            .AnyAsync(cancellationToken);

        if (skillsExist)
        {
            logger.LogInformation("Software skill seed skipped because rows already exist");
            return;
        }

        var skills = new[]
        {
            SoftwareSkill.Create("HTML5", "fab fa-html5", 0, true),
            SoftwareSkill.Create("CSS3", "fab fa-css3-alt", 1, true),
            SoftwareSkill.Create("Sass", "fab fa-sass", 2, true),
            SoftwareSkill.Create("JavaScript", "fab fa-js", 3, true),
            SoftwareSkill.Create("TypeScript", "fas fa-code", 4, true),
            SoftwareSkill.Create("React", "fab fa-react", 5, true),
            SoftwareSkill.Create("Node.js", "fab fa-node", 6, true),
            SoftwareSkill.Create("npm", "fab fa-npm", 7, true),
            SoftwareSkill.Create("C#", "fas fa-hashtag", 8, true),
            SoftwareSkill.Create("ASP.NET Core", "fas fa-server", 9, true),
            SoftwareSkill.Create("PostgreSQL", "fas fa-database", 10, true),
            SoftwareSkill.Create("Docker", "fab fa-docker", 11, true),
            SoftwareSkill.Create("AWS", "fab fa-aws", 12, true),
            SoftwareSkill.Create("Firebase", "fas fa-fire", 13, true),
            SoftwareSkill.Create("Python", "fab fa-python", 14, true),
            SoftwareSkill.Create("Git", "fab fa-git-alt", 15, true),
        };

        await dbContext.SoftwareSkills.AddRangeAsync(skills, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);
        logger.LogInformation("Seeded {Count} software skills", skills.Length);
    }
}
