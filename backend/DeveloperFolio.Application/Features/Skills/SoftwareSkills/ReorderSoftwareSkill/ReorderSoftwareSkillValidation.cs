using FluentValidation;

namespace DeveloperFolio.Application.Features.Skills.SoftwareSkills.ReorderSoftwareSkill;

internal sealed class ReorderSoftwareSkillValidation : AbstractValidator<ReorderSoftwareSkillCommand>
{
    public ReorderSoftwareSkillValidation()
    {
        RuleFor(command => command.Id).NotEmpty();
        RuleFor(command => command.Direction)
            .NotEmpty()
            .Must(direction =>
                direction.Equals("up", StringComparison.OrdinalIgnoreCase)
                || direction.Equals("down", StringComparison.OrdinalIgnoreCase))
            .WithMessage("Direction must be either 'up' or 'down'.");
    }
}
