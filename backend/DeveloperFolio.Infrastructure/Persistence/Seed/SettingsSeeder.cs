using DeveloperFolio.Domain.Settings;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace DeveloperFolio.Infrastructure.Persistence.Seed;

internal sealed class SettingsSeeder(
    ApplicationDbContext dbContext,
    ILogger<SettingsSeeder> logger)
{
    public async Task SeedAsync(CancellationToken cancellationToken = default)
    {
        await SeedGreetingAsync(cancellationToken);
        await SeedContactAsync(cancellationToken);
        await SeedSocialLinksAsync(cancellationToken);
    }

    private async Task SeedGreetingAsync(CancellationToken cancellationToken)
    {
        var exists = await dbContext.GreetingSettings
            .AsNoTracking()
            .AnyAsync(cancellationToken);

        if (exists)
        {
            logger.LogInformation("Greeting seed skipped because singleton already exists");
            return;
        }

        var greeting = GreetingSettings.Create(
            "Ali Hmaidi",
            "Hi all, I'm Ali",
            "A passionate full-stack developer crafting polished products with React and ASP.NET Core. I enjoy turning hard problems into simple, calm interfaces.",
            null,
            null,
            true);

        await dbContext.GreetingSettings.AddAsync(greeting, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);
        logger.LogInformation("Seeded greeting settings");
    }

    private async Task SeedContactAsync(CancellationToken cancellationToken)
    {
        var exists = await dbContext.ContactSettings
            .AsNoTracking()
            .AnyAsync(cancellationToken);

        if (exists)
        {
            logger.LogInformation("Contact seed skipped because singleton already exists");
            return;
        }

        var contact = ContactSettings.Create(
            "Contact Me",
            "Want to discuss a project or just want to say hi? My inbox is open for everyone.",
            "alihmaidi095@gmail.com",
            null,
            null);

        await dbContext.ContactSettings.AddAsync(contact, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);
        logger.LogInformation("Seeded contact settings");
    }

    private async Task SeedSocialLinksAsync(CancellationToken cancellationToken)
    {
        var exists = await dbContext.SocialLinks
            .AsNoTracking()
            .AnyAsync(cancellationToken);

        if (exists)
        {
            logger.LogInformation("Social links seed skipped because rows already exist");
            return;
        }

        var links = new[]
        {
            SocialLink.Create("GitHub", "https://github.com/alihmaidi1", "fab fa-github", 0, true),
            SocialLink.Create("LinkedIn", "https://www.linkedin.com/", "fab fa-linkedin-in", 1, true),
            SocialLink.Create("Email", "mailto:alihmaidi095@gmail.com", "fas fa-envelope", 2, true),
        };

        await dbContext.SocialLinks.AddRangeAsync(links, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);
        logger.LogInformation("Seeded {Count} social links", links.Length);
    }
}
