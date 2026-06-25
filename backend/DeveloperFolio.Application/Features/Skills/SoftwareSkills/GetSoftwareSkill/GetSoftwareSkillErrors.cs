using DeveloperFolio.Domain.OperationResult;

namespace DeveloperFolio.Application.Features.Skills.SoftwareSkills.GetSoftwareSkill;

internal static class GetSoftwareSkillErrors
{
    public static readonly Error NotFound = new(
        "Skills.SoftwareSkill.NotFound",
        "The requested software skill was not found.");
}
