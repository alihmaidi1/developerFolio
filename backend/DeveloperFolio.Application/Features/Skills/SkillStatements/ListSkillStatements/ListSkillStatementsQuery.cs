using DeveloperFolio.Application.Common.Messaging;
using DeveloperFolio.Application.Features.Skills.SkillStatements.GetSkillStatement;
using DeveloperFolio.Domain.OperationResult;

namespace DeveloperFolio.Application.Features.Skills.SkillStatements.ListSkillStatements;

internal sealed record ListSkillStatementsQuery
    : IQuery<TResult<IReadOnlyCollection<SkillStatementResponse>>>;
