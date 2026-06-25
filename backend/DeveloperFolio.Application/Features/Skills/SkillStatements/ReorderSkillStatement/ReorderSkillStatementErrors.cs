using DeveloperFolio.Domain.OperationResult;

namespace DeveloperFolio.Application.Features.Skills.SkillStatements.ReorderSkillStatement;

internal static class ReorderSkillStatementErrors
{
    public static readonly Error NotFound = new(
        "Skills.Statement.NotFound",
        "The requested skill statement was not found.");
}
