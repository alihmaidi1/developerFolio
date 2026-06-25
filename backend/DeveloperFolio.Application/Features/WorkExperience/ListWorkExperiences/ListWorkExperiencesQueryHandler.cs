using DeveloperFolio.Application.Abstractions;
using DeveloperFolio.Application.Features.WorkExperience.GetWorkExperience;
using DeveloperFolio.Domain.OperationResult;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace DeveloperFolio.Application.Features.WorkExperience.ListWorkExperiences;

internal sealed class ListWorkExperiencesQueryHandler(IApplicationDbContext dbContext)
    : IRequestHandler<ListWorkExperiencesQuery, TResult<IReadOnlyCollection<WorkExperienceResponse>>>
{
    public async Task<TResult<IReadOnlyCollection<WorkExperienceResponse>>> Handle(
        ListWorkExperiencesQuery request,
        CancellationToken cancellationToken)
    {
        var entries = await dbContext.WorkExperienceEntries
            .AsNoTracking()
            .Include(entry => entry.DescriptionBullets)
            .OrderBy(entry => entry.SortOrder)
            .ThenByDescending(entry => entry.CreatedAtUtc)
            .ToArrayAsync(cancellationToken);

        return Result.Success<IReadOnlyCollection<WorkExperienceResponse>>(
            entries.Select(WorkExperienceResponse.From).ToArray());
    }
}
