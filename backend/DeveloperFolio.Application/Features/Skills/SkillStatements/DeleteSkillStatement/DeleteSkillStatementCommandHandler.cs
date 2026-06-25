using DeveloperFolio.Application.Abstractions;
using DeveloperFolio.Domain.OperationResult;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace DeveloperFolio.Application.Features.Skills.SkillStatements.DeleteSkillStatement;

internal sealed class DeleteSkillStatementCommandHandler(IApplicationDbContext dbContext)
    : IRequestHandler<DeleteSkillStatementCommand, Result>
{
    public async Task<Result> Handle(
        DeleteSkillStatementCommand request,
        CancellationToken cancellationToken)
    {
        var statement = await dbContext.SkillStatements
            .SingleOrDefaultAsync(item => item.Id == request.Id, cancellationToken);

        if (statement is null)
        {
            return Result.NotFound(DeleteSkillStatementErrors.NotFound);
        }

        dbContext.SkillStatements.Remove(statement);
        return Result.NoContent();
    }
}
