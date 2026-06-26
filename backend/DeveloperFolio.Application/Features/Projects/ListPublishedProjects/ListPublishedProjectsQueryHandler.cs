using DeveloperFolio.Application.Abstractions;
using DeveloperFolio.Domain.OperationResult;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace DeveloperFolio.Application.Features.Projects.ListPublishedProjects;

internal sealed class ListPublishedProjectsQueryHandler(IApplicationDbContext dbContext)
    : IRequestHandler<ListPublishedProjectsQuery,
        TResult<IReadOnlyCollection<PublishedProjectResponse>>>
{
    public async Task<TResult<IReadOnlyCollection<PublishedProjectResponse>>> Handle(
        ListPublishedProjectsQuery request,
        CancellationToken cancellationToken)
    {
        var projects = await dbContext.Projects
            .AsNoTracking()
            .Include(project => project.Technologies)
            .Where(project => project.IsPublished)
            .OrderBy(project => project.SortOrder)
            .ThenByDescending(project => project.CreatedAtUtc)
            .ToArrayAsync(cancellationToken);

        return Result.Success<IReadOnlyCollection<PublishedProjectResponse>>(
            projects.Select(PublishedProjectResponse.From).ToArray());
    }
}
