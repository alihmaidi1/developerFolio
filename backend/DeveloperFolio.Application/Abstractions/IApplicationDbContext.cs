
using DeveloperFolio.Domain.Security;
using Microsoft.EntityFrameworkCore;

namespace DeveloperFolio.Application.Abstractions;

public interface IApplicationDbContext
{
    DbSet<AdminUser> AdminUsers { get; }
    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}
