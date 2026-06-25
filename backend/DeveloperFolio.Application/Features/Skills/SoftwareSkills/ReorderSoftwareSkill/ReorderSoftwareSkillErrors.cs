using DeveloperFolio.Domain.OperationResult;

namespace DeveloperFolio.Application.Features.Skills.SoftwareSkills.ReorderSoftwareSkill;

internal static class ReorderSoftwareSkillErrors
{
    public static readonly Error NotFound = new(
        "Skills.SoftwareSkill.NotFound",
        "The requested software skill was not found.");
}
