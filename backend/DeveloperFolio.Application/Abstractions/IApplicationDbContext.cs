using DeveloperFolio.Domain.Education;
using DeveloperFolio.Domain.Projects;
using DeveloperFolio.Domain.Security;
using Microsoft.EntityFrameworkCore;

namespace DeveloperFolio.Application.Abstractions;

public interface IApplicationDbContext
{
    DbSet<AdminUser> AdminUsers { get; }
    DbSet<PortfolioProject> Projects { get; }
    DbSet<EducationEntry> EducationEntries { get; }
    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}
