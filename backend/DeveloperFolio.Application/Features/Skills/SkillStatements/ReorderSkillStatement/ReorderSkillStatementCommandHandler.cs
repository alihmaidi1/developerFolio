using DeveloperFolio.Application.Abstractions;
using DeveloperFolio.Domain.OperationResult;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace DeveloperFolio.Application.Features.Skills.SkillStatements.ReorderSkillStatement;

internal sealed class ReorderSkillStatementCommandHandler(IApplicationDbContext dbContext)
    : IRequestHandler<ReorderSkillStatementCommand, Result>
{
    public async Task<Result> Handle(
        ReorderSkillStatementCommand request,
        CancellationToken cancellationToken)
    {
        var statements = await dbContext.SkillStatements
            .OrderBy(statement => statement.SortOrder)
            .ThenBy(statement => statement.CreatedAtUtc)
            .ThenBy(statement => statement.Id)
            .ToListAsync(cancellationToken);

        var currentIndex = statements.FindIndex(statement => statement.Id == request.Id);

        if (currentIndex < 0)
        {
            return Result.NotFound(ReorderSkillStatementErrors.NotFound);
        }

        var targetIndex = request.Direction.Equals("up", StringComparison.OrdinalIgnoreCase)
            ? currentIndex - 1
            : currentIndex + 1;

        if (targetIndex < 0 || targetIndex >= statements.Count)
        {
            return Result.NoContent();
        }

        (statements[currentIndex], statements[targetIndex]) = (statements[targetIndex], statements[currentIndex]);

        for (var index = 0; index < statements.Count; index++)
        {
            statements[index].SetSortOrder(index);
        }

        return Result.NoContent();
    }
}
