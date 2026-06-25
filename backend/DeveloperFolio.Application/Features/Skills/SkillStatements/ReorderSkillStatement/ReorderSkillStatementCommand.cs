using DeveloperFolio.Application.Common.Messaging;
using DeveloperFolio.Domain.OperationResult;

namespace DeveloperFolio.Application.Features.Skills.SkillStatements.ReorderSkillStatement;

internal sealed record ReorderSkillStatementCommand(Guid Id, string Direction) : ICommand<Result>;
