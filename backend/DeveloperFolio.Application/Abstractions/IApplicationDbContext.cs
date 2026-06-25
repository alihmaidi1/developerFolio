using DeveloperFolio.Domain.Education;
using DeveloperFolio.Domain.Projects;
using DeveloperFolio.Domain.Security;
using DeveloperFolio.Domain.Settings;
using DeveloperFolio.Domain.Skills;
using DeveloperFolio.Domain.WorkExperience;
using Microsoft.EntityFrameworkCore;

namespace DeveloperFolio.Application.Abstractions;

public interface IApplicationDbContext
{
    DbSet<AdminUser> AdminUsers { get; }
    DbSet<PortfolioProject> Projects { get; }
    DbSet<EducationEntry> EducationEntries { get; }
    DbSet<WorkExperienceEntry> WorkExperienceEntries { get; }
    DbSet<SkillStatement> SkillStatements { get; }
    DbSet<SoftwareSkill> SoftwareSkills { get; }
    DbSet<GreetingSettings> GreetingSettings { get; }
    DbSet<ContactSettings> ContactSettings { get; }
    DbSet<SocialLink> SocialLinks { get; }
    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}
