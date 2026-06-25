using DeveloperFolio.Application.Common.Messaging;
using DeveloperFolio.Domain.OperationResult;

namespace DeveloperFolio.Application.Features.Skills.SkillStatements.GetSkillStatement;

internal sealed record GetSkillStatementQuery(Guid Id) : IQuery<TResult<SkillStatementResponse>>;
