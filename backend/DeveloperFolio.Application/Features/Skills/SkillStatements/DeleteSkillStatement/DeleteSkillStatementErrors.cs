using DeveloperFolio.Domain.OperationResult;

namespace DeveloperFolio.Application.Features.Skills.SkillStatements.DeleteSkillStatement;

internal static class DeleteSkillStatementErrors
{
    public static readonly Error NotFound = new(
        "Skills.Statement.NotFound",
        "The requested skill statement was not found.");
}
