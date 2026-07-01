using DeveloperFolio.Application.Abstractions;
using DeveloperFolio.Domain.Security;
using DeveloperFolio.Domain.Settings;
using DeveloperFolio.Infrastructure.Persistence;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;

namespace DeveloperFolio.Tests.Integration;

public sealed class ApiFactory : WebApplicationFactory<Program>, IAsyncLifetime
{
    private readonly SqliteConnection _connection = new("Data Source=:memory:");

    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        builder.UseEnvironment("Testing");
        builder.ConfigureAppConfiguration((_, configuration) =>
        {
            configuration.AddInMemoryCollection(new Dictionary<string, string?>
            {
                ["ConnectionStrings:Database"] = "Host=unused",
                ["Jwt:Issuer"] = "DeveloperFolio.Tests",
                ["Jwt:Audience"] = "DeveloperFolio.Tests",
                ["Jwt:Key"] = "integration-test-signing-key-1234567890",
                ["AdminSeed:Email"] = "admin@example.com",
                ["AdminSeed:Password"] = "integration-password",
            });
        });
        builder.UseWebRoot(Path.Combine(Path.GetTempPath(), $"developerfolio-{Guid.NewGuid():N}"));
        builder.ConfigureServices(services =>
        {
            services.RemoveAll<DbContextOptions<ApplicationDbContext>>();
            services.RemoveAll<IDbContextOptionsConfiguration<ApplicationDbContext>>();
            services.AddSingleton(_connection);
            services.AddDbContext<ApplicationDbContext>((provider, options) =>
                options.UseSqlite(provider.GetRequiredService<SqliteConnection>()));
        });
    }

    public async Task InitializeAsync()
    {
        await _connection.OpenAsync();
        using var scope = Services.CreateScope();
        var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
        await dbContext.Database.EnsureCreatedAsync();
        var passwordHasher = scope.ServiceProvider.GetRequiredService<IPasswordHasher>();
        dbContext.AdminUsers.Add(AdminUser.Create(
            "admin@example.com",
            passwordHasher.Hash("integration-password")));
        dbContext.GreetingSettings.Add(GreetingSettings.Create(
            "Ali Hmaidi",
            "Backend Developer",
            "Integration test landing summary.",
            null,
            true));
        dbContext.ContactSettings.Add(ContactSettings.Create(
            "Contact Me",
            "Integration test contact summary.",
            "admin@example.com",
            null,
            "Testing"));
        await dbContext.SaveChangesAsync();
    }

    async Task IAsyncLifetime.DisposeAsync()
    {
        await _connection.DisposeAsync();
    }
}
