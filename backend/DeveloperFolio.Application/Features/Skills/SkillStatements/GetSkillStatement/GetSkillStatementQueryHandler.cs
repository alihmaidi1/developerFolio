using DeveloperFolio.Application.Abstractions;
using DeveloperFolio.Domain.OperationResult;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace DeveloperFolio.Application.Features.Skills.SkillStatements.GetSkillStatement;

internal sealed class GetSkillStatementQueryHandler(IApplicationDbContext dbContext)
    : IRequestHandler<GetSkillStatementQuery, TResult<SkillStatementResponse>>
{
    public async Task<TResult<SkillStatementResponse>> Handle(
        GetSkillStatementQuery request,
        CancellationToken cancellationToken)
    {
        var statement = await dbContext.SkillStatements
            .AsNoTracking()
            .SingleOrDefaultAsync(item => item.Id == request.Id, cancellationToken);

        return statement is null
            ? Result.NotFound<SkillStatementResponse>(GetSkillStatementErrors.NotFound)
            : Result.Success(SkillStatementResponse.From(statement));
    }
}
