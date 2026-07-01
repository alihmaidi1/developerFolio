using DeveloperFolio.Infrastructure.Persistence.Seed;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace DeveloperFolio.Infrastructure.Persistence;

public static class DatabaseInitializer
{
    public static async Task InitializeDatabaseAsync(this WebApplication app)
    {
        if (app.Environment.IsEnvironment("Testing"))
        {
            return;
        }

        await using var scope = app.Services.CreateAsyncScope();
        var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
        await dbContext.Database.MigrateAsync();
        await scope.ServiceProvider.GetRequiredService<AdminSeeder>().SeedAsync();
        await scope.ServiceProvider.GetRequiredService<SettingsSeeder>().SeedAsync();
        // Skills seed in every environment (idempotent — skips if rows exist).
        await scope.ServiceProvider.GetRequiredService<SkillsSeeder>().SeedAsync();

        if (app.Environment.IsDevelopment())
        {
            // Personal/demo content stays Development-only.
            await scope.ServiceProvider.GetRequiredService<ProjectSeeder>().SeedAsync();
            await scope.ServiceProvider.GetRequiredService<EducationSeeder>().SeedAsync();
            await scope.ServiceProvider.GetRequiredService<WorkExperienceSeeder>().SeedAsync();
        }
    }
}
