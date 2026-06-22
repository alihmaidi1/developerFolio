using DeveloperFolio.Application.Abstractions;
using DeveloperFolio.Domain.OperationResult;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace DeveloperFolio.Application.Features.Projects.ReorderProject;

internal sealed class ReorderProjectCommandHandler(IApplicationDbContext dbContext)
    : IRequestHandler<ReorderProjectCommand, Result>
{
    public async Task<Result> Handle(ReorderProjectCommand request, CancellationToken cancellationToken)
    {
        var projects = await dbContext.Projects
            .OrderBy(project => project.SortOrder)
            .ThenBy(project => project.CreatedAtUtc)
            .ThenBy(project => project.Id)
            .ToListAsync(cancellationToken);

        var currentIndex = projects.FindIndex(project => project.Id == request.Id);

        if (currentIndex < 0)
        {
            return Result.NotFound(ReorderProjectErrors.NotFound);
        }

        var targetIndex = request.Direction.Equals("up", StringComparison.OrdinalIgnoreCase)
            ? currentIndex - 1
            : currentIndex + 1;

        if (targetIndex < 0 || targetIndex >= projects.Count)
        {
            return Result.NoContent();
        }

        (projects[currentIndex], projects[targetIndex]) = (projects[targetIndex], projects[currentIndex]);

        for (var index = 0; index < projects.Count; index++)
        {
            projects[index].SetSortOrder(index);
        }

        return Result.NoContent();
    }
}
