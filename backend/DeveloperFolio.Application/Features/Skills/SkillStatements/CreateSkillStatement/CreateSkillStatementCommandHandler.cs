using DeveloperFolio.Application.Abstractions;
using DeveloperFolio.Domain.OperationResult;
using DeveloperFolio.Domain.Skills;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace DeveloperFolio.Application.Features.Skills.SkillStatements.CreateSkillStatement;

internal sealed class CreateSkillStatementCommandHandler(IApplicationDbContext dbContext)
    : IRequestHandler<CreateSkillStatementCommand, TResult<Guid>>
{
    public async Task<TResult<Guid>> Handle(
        CreateSkillStatementCommand request,
        CancellationToken cancellationToken)
    {
        var lastSortOrder = await dbContext.SkillStatements
            .MaxAsync(statement => (int?)statement.SortOrder, cancellationToken)
            ?? -1;

        var statement = SkillStatement.Create(request.Text, lastSortOrder + 1, request.IsPublished);
        dbContext.SkillStatements.Add(statement);
        return Result.Created(statement.Id);
    }
}
