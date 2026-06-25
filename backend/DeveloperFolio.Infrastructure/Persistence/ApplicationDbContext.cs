using DeveloperFolio.Application.Abstractions;
using DeveloperFolio.Domain.Education;
using DeveloperFolio.Domain.Projects;
using DeveloperFolio.Domain.Security;
using DeveloperFolio.Domain.Settings;
using DeveloperFolio.Domain.Skills;
using DeveloperFolio.Domain.WorkExperience;
using Microsoft.EntityFrameworkCore;

namespace DeveloperFolio.Infrastructure.Persistence;

public sealed class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
    : DbContext(options), IApplicationDbContext
{
    public DbSet<AdminUser> AdminUsers => Set<AdminUser>();
    public DbSet<PortfolioProject> Projects => Set<PortfolioProject>();
    public DbSet<EducationEntry> EducationEntries => Set<EducationEntry>();
    public DbSet<WorkExperienceEntry> WorkExperienceEntries => Set<WorkExperienceEntry>();
    public DbSet<SkillStatement> SkillStatements => Set<SkillStatement>();
    public DbSet<SoftwareSkill> SoftwareSkills => Set<SoftwareSkill>();
    public DbSet<GreetingSettings> GreetingSettings => Set<GreetingSettings>();
    public DbSet<ContactSettings> ContactSettings => Set<ContactSettings>();
    public DbSet<SocialLink> SocialLinks => Set<SocialLink>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(ApplicationDbContext).Assembly);
    }
}
