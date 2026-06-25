using DeveloperFolio.Application.Common.Messaging;
using DeveloperFolio.Domain.OperationResult;

namespace DeveloperFolio.Application.Features.Skills.SkillStatements.DeleteSkillStatement;

internal sealed record DeleteSkillStatementCommand(Guid Id) : ICommand<Result>;
