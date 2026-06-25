using DeveloperFolio.Domain.OperationResult;

namespace DeveloperFolio.Application.Features.Skills.SkillStatements.UpdateSkillStatement;

internal static class UpdateSkillStatementErrors
{
    public static readonly Error NotFound = new(
        "Skills.Statement.NotFound",
        "The requested skill statement was not found.");
}
