using DeveloperFolio.Application.Abstractions;
using DeveloperFolio.Domain.OperationResult;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace DeveloperFolio.Application.Features.Education.ListPublishedEducations;

internal sealed class ListPublishedEducationsQueryHandler(IApplicationDbContext dbContext)
    : IRequestHandler<ListPublishedEducationsQuery,
        TResult<IReadOnlyCollection<PublishedEducationResponse>>>
{
    public async Task<TResult<IReadOnlyCollection<PublishedEducationResponse>>> Handle(
        ListPublishedEducationsQuery request,
        CancellationToken cancellationToken)
    {
        var entries = await dbContext.EducationEntries
            .AsNoTracking()
            .Include(entry => entry.DescriptionBullets)
            .Where(entry => entry.IsPublished)
            .OrderBy(entry => entry.SortOrder)
            .ThenByDescending(entry => entry.CreatedAtUtc)
            .ToArrayAsync(cancellationToken);

        return Result.Success<IReadOnlyCollection<PublishedEducationResponse>>(
            entries.Select(PublishedEducationResponse.From).ToArray());
    }
}
