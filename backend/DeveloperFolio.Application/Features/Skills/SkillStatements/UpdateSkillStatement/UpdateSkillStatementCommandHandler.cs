using DeveloperFolio.Application.Abstractions;
using DeveloperFolio.Domain.OperationResult;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace DeveloperFolio.Application.Features.Skills.SkillStatements.UpdateSkillStatement;

internal sealed class UpdateSkillStatementCommandHandler(IApplicationDbContext dbContext)
    : IRequestHandler<UpdateSkillStatementCommand, Result>
{
    public async Task<Result> Handle(
        UpdateSkillStatementCommand request,
        CancellationToken cancellationToken)
    {
        var statement = await dbContext.SkillStatements
            .SingleOrDefaultAsync(item => item.Id == request.Id, cancellationToken);

        if (statement is null)
        {
            return Result.NotFound(UpdateSkillStatementErrors.NotFound);
        }

        statement.Update(request.Text, request.IsPublished);
        return Result.NoContent();
    }
}
