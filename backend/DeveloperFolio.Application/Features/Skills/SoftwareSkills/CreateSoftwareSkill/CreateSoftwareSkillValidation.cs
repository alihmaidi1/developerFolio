using FluentValidation;

namespace DeveloperFolio.Application.Features.Skills.SoftwareSkills.CreateSoftwareSkill;

internal sealed class CreateSoftwareSkillValidation : AbstractValidator<CreateSoftwareSkillCommand>
{
    public CreateSoftwareSkillValidation()
    {
        RuleFor(command => command.Name).NotEmpty().MaximumLength(80);
        RuleFor(command => command.IconClassName).NotEmpty().MaximumLength(160);
    }
}
