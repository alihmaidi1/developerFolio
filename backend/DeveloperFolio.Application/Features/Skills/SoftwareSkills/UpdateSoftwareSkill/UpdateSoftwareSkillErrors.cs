using DeveloperFolio.Domain.OperationResult;

namespace DeveloperFolio.Application.Features.Skills.SoftwareSkills.UpdateSoftwareSkill;

internal static class UpdateSoftwareSkillErrors
{
    public static readonly Error NotFound = new(
        "Skills.SoftwareSkill.NotFound",
        "The requested software skill was not found.");
}
