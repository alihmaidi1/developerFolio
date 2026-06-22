using DeveloperFolio.Application.Abstractions;
using DeveloperFolio.Domain.OperationResult;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace DeveloperFolio.Application.Features.Projects.ListProjects;

internal sealed class ListProjectsQueryHandler(IApplicationDbContext dbContext)
    : IRequestHandler<ListProjectsQuery, TResult<IReadOnlyCollection<ListProjectResponse>>>
{
    public async Task<TResult<IReadOnlyCollection<ListProjectResponse>>> Handle(
        ListProjectsQuery request,
        CancellationToken cancellationToken)
    {
        var projects = await dbContext.Projects
            .AsNoTracking()
            .Include(project => project.Technologies)
            .OrderBy(project => project.SortOrder)
            .ThenByDescending(project => project.CreatedAtUtc)
            .ToArrayAsync(cancellationToken);

        return Result.Success<IReadOnlyCollection<ListProjectResponse>>(
            projects.Select(ListProjectResponse.From).ToArray());
    }
}
