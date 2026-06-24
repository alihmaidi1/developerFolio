using DeveloperFolio.Application.Abstractions;
using DeveloperFolio.Application.Features.Education.GetEducation;
using DeveloperFolio.Domain.OperationResult;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace DeveloperFolio.Application.Features.Education.ListEducations;

internal sealed class ListEducationsQueryHandler(IApplicationDbContext dbContext)
    : IRequestHandler<ListEducationsQuery, TResult<IReadOnlyCollection<EducationResponse>>>
{
    public async Task<TResult<IReadOnlyCollection<EducationResponse>>> Handle(
        ListEducationsQuery request,
        CancellationToken cancellationToken)
    {
        var entries = await dbContext.EducationEntries
            .AsNoTracking()
            .Include(entry => entry.DescriptionBullets)
            .OrderBy(entry => entry.SortOrder)
            .ThenByDescending(entry => entry.CreatedAtUtc)
            .ToArrayAsync(cancellationToken);

        return Result.Success<IReadOnlyCollection<EducationResponse>>(
            entries.Select(EducationResponse.From).ToArray());
    }
}
