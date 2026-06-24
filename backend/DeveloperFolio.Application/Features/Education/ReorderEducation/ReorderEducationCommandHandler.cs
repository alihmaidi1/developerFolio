using DeveloperFolio.Application.Abstractions;
using DeveloperFolio.Domain.OperationResult;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace DeveloperFolio.Application.Features.Education.ReorderEducation;

internal sealed class ReorderEducationCommandHandler(IApplicationDbContext dbContext)
    : IRequestHandler<ReorderEducationCommand, Result>
{
    public async Task<Result> Handle(ReorderEducationCommand request, CancellationToken cancellationToken)
    {
        var entries = await dbContext.EducationEntries
            .OrderBy(entry => entry.SortOrder)
            .ThenBy(entry => entry.CreatedAtUtc)
            .ThenBy(entry => entry.Id)
            .ToListAsync(cancellationToken);

        var currentIndex = entries.FindIndex(entry => entry.Id == request.Id);

        if (currentIndex < 0)
        {
            return Result.NotFound(ReorderEducationErrors.NotFound);
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
