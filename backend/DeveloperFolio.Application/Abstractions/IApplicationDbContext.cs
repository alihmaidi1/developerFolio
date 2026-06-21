using DeveloperFolio.Domain.Projects;
using DeveloperFolio.Domain.Resume;
using DeveloperFolio.Domain.Security;
using Microsoft.EntityFrameworkCore;

namespace DeveloperFolio.Application.Abstractions;

public interface IApplicationDbContext
{
    DbSet<PortfolioProject> Projects { get; }
    DbSet<ResumeDocument> ResumeDocuments { get; }
    DbSet<AdminUser> AdminUsers { get; }
    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}
