using DeveloperFolio.Domain.Skills;

namespace DeveloperFolio.Application.Features.Skills.SkillStatements.GetSkillStatement;

public sealed record SkillStatementResponse(
    Guid Id,
    string Text,
    int SortOrder,
    bool IsPublished,
    DateTimeOffset CreatedAtUtc,
    DateTimeOffset UpdatedAtUtc)
{
    internal static SkillStatementResponse From(SkillStatement statement) =>
        new(
            statement.Id,
            statement.Text,
            statement.SortOrder,
            statement.IsPublished,
            statement.CreatedAtUtc,
            statement.UpdatedAtUtc);
}
