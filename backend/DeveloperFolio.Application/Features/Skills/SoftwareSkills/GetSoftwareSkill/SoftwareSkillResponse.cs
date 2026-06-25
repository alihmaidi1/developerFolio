using DeveloperFolio.Domain.Skills;

namespace DeveloperFolio.Application.Features.Skills.SoftwareSkills.GetSoftwareSkill;

public sealed record SoftwareSkillResponse(
    Guid Id,
    string Name,
    string IconClassName,
    int SortOrder,
    bool IsPublished,
    DateTimeOffset CreatedAtUtc,
    DateTimeOffset UpdatedAtUtc)
{
    internal static SoftwareSkillResponse From(SoftwareSkill skill) =>
        new(
            skill.Id,
            skill.Name,
            skill.IconClassName,
            skill.SortOrder,
            skill.IsPublished,
            skill.CreatedAtUtc,
            skill.UpdatedAtUtc);
}
