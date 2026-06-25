using DeveloperFolio.Domain.OperationResult;

namespace DeveloperFolio.Application.Features.Skills.SoftwareSkills.DeleteSoftwareSkill;

internal static class DeleteSoftwareSkillErrors
{
    public static readonly Error NotFound = new(
        "Skills.SoftwareSkill.NotFound",
        "The requested software skill was not found.");
}
