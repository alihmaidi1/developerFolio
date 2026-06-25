using FluentValidation;

namespace DeveloperFolio.Application.Features.Skills.SoftwareSkills.DeleteSoftwareSkill;

internal sealed class DeleteSoftwareSkillValidation : AbstractValidator<DeleteSoftwareSkillCommand>
{
    public DeleteSoftwareSkillValidation()
    {
        RuleFor(command => command.Id).NotEmpty();
    }
}
