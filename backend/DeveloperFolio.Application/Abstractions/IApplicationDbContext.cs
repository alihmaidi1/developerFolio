using DeveloperFolio.Domain.Education;
using DeveloperFolio.Domain.Projects;
using DeveloperFolio.Domain.Security;
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
    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}
