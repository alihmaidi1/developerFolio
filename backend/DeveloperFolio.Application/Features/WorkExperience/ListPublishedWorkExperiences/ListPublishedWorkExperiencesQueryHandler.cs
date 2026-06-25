using DeveloperFolio.Application.Abstractions;
using DeveloperFolio.Domain.OperationResult;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace DeveloperFolio.Application.Features.WorkExperience.ListPublishedWorkExperiences;

internal sealed class ListPublishedWorkExperiencesQueryHandler(IApplicationDbContext dbContext)
    : IRequestHandler<ListPublishedWorkExperiencesQuery,
        TResult<IReadOnlyCollection<PublishedWorkExperienceResponse>>>
{
    public async Task<TResult<IReadOnlyCollection<PublishedWorkExperienceResponse>>> Handle(
        ListPublishedWorkExperiencesQuery request,
        CancellationToken cancellationToken)
    {
        var entries = await dbContext.WorkExperienceEntries
            .AsNoTracking()
            .Include(entry => entry.DescriptionBullets)
            .Where(entry => entry.IsPublished)
            .OrderBy(entry => entry.SortOrder)
            .ThenByDescending(entry => entry.CreatedAtUtc)
            .ToArrayAsync(cancellationToken);

        return Result.Success<IReadOnlyCollection<PublishedWorkExperienceResponse>>(
            entries.Select(PublishedWorkExperienceResponse.From).ToArray());
    }
}
