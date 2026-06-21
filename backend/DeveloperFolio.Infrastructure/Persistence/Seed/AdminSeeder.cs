using DeveloperFolio.Application.Abstractions;
using DeveloperFolio.Domain.Security;
using DeveloperFolio.Infrastructure.Options;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace DeveloperFolio.Infrastructure.Persistence.Seed;

internal sealed class AdminSeeder(
    ApplicationDbContext dbContext,
    IPasswordHasher passwordHasher,
    IOptions<AdminSeedOptions> options,
    ILogger<AdminSeeder> logger)
{
    public async Task SeedAsync(CancellationToken cancellationToken = default)
    {
        var email = options.Value.Email.Trim().ToLowerInvariant();
        var adminExists = await dbContext.AdminUsers
            .AsNoTracking()
            .AnyAsync(admin => admin.Email == email, cancellationToken);

        if (adminExists)
        {
            logger.LogInformation("Admin seed skipped because {AdminEmail} already exists", email);
            return;
        }

        var passwordHash = passwordHasher.Hash(options.Value.Password);
        await dbContext.AdminUsers.AddAsync(AdminUser.Create(email, passwordHash), cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);
        logger.LogInformation("Seeded admin account {AdminEmail}", email);
    }
}
