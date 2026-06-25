using DeveloperFolio.Application.Abstractions;
using DeveloperFolio.Application.Features.Skills.SkillStatements.GetSkillStatement;
using DeveloperFolio.Domain.OperationResult;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace DeveloperFolio.Application.Features.Skills.SkillStatements.ListSkillStatements;

internal sealed class ListSkillStatementsQueryHandler(IApplicationDbContext dbContext)
    : IRequestHandler<ListSkillStatementsQuery, TResult<IReadOnlyCollection<SkillStatementResponse>>>
{
    public async Task<TResult<IReadOnlyCollection<SkillStatementResponse>>> Handle(
        ListSkillStatementsQuery request,
        CancellationToken cancellationToken)
    {
        var statements = await dbContext.SkillStatements
            .AsNoTracking()
            .OrderBy(statement => statement.SortOrder)
            .ThenByDescending(statement => statement.CreatedAtUtc)
            .ToArrayAsync(cancellationToken);

        return Result.Success<IReadOnlyCollection<SkillStatementResponse>>(
            statements.Select(SkillStatementResponse.From).ToArray());
    }
}
