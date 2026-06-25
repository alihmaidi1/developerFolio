using DeveloperFolio.Application.Abstractions;
using DeveloperFolio.Domain.OperationResult;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace DeveloperFolio.Application.Features.WorkExperience.ReorderWorkExperience;

internal sealed class ReorderWorkExperienceCommandHandler(IApplicationDbContext dbContext)
    : IRequestHandler<ReorderWorkExperienceCommand, Result>
{
    public async Task<Result> Handle(
        ReorderWorkExperienceCommand request,
        CancellationToken cancellationToken)
    {
        var entries = await dbContext.WorkExperienceEntries
            .OrderBy(entry => entry.SortOrder)
            .ThenBy(entry => entry.CreatedAtUtc)
            .ThenBy(entry => entry.Id)
            .ToListAsync(cancellationToken);

        var currentIndex = entries.FindIndex(entry => entry.Id == request.Id);

        if (currentIndex < 0)
        {
            return Result.NotFound(ReorderWorkExperienceErrors.NotFound);
        }

        var targetIndex = request.Direction.Equals("up", StringComparison.OrdinalIgnoreCase)
            ? currentIndex - 1
            : currentIndex + 1;

        if (targetIndex < 0 || targetIndex >= entries.Count)
        {
            return Result.NoContent();
        }

        (entries[currentIndex], entries[targetIndex]) = (entries[targetIndex], entries[currentIndex]);

        for (var index = 0; index < entries.Count; index++)
        {
            entries[index].SetSortOrder(index);
        }

        return Result.NoContent();
    }
}
