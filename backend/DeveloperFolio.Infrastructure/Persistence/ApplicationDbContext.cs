using DeveloperFolio.Application.Abstractions;
using DeveloperFolio.Domain.Projects;
using DeveloperFolio.Domain.Security;
using Microsoft.EntityFrameworkCore;

namespace DeveloperFolio.Infrastructure.Persistence;

public sealed class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
    : DbContext(options), IApplicationDbContext
{
    public DbSet<AdminUser> AdminUsers => Set<AdminUser>();
    public DbSet<PortfolioProject> Projects => Set<PortfolioProject>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(ApplicationDbContext).Assembly);
    }
}
