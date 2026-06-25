using DeveloperFolio.Domain.OperationResult;

namespace DeveloperFolio.Application.Features.Skills.SkillStatements.GetSkillStatement;

internal static class GetSkillStatementErrors
{
    public static readonly Error NotFound = new(
        "Skills.Statement.NotFound",
        "The requested skill statement was not found.");
}
