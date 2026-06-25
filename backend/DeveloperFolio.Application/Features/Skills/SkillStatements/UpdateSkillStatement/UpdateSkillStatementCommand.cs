using DeveloperFolio.Application.Common.Messaging;
using DeveloperFolio.Domain.OperationResult;

namespace DeveloperFolio.Application.Features.Skills.SkillStatements.UpdateSkillStatement;

internal sealed record UpdateSkillStatementCommand(Guid Id, string Text, bool IsPublished)
    : ICommand<Result>;
