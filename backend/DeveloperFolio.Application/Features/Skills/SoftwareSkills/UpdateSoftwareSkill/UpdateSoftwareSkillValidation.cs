using FluentValidation;

namespace DeveloperFolio.Application.Features.Skills.SoftwareSkills.UpdateSoftwareSkill;

internal sealed class UpdateSoftwareSkillValidation : AbstractValidator<UpdateSoftwareSkillCommand>
{
    public UpdateSoftwareSkillValidation()
    {
        RuleFor(command => command.Id).NotEmpty();
        RuleFor(command => command.Name).NotEmpty().MaximumLength(80);
        RuleFor(command => command.IconClassName).NotEmpty().MaximumLength(160);
    }
}
