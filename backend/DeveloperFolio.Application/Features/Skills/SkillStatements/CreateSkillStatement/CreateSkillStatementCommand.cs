using DeveloperFolio.Application.Common.Messaging;
using DeveloperFolio.Domain.OperationResult;

namespace DeveloperFolio.Application.Features.Skills.SkillStatements.CreateSkillStatement;

internal sealed record CreateSkillStatementCommand(string Text, bool IsPublished)
    : ICommand<TResult<Guid>>;
