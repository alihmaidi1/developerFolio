using FluentValidation;

namespace DeveloperFolio.Application.Features.Skills.SkillStatements.ReorderSkillStatement;

internal sealed class ReorderSkillStatementValidation : AbstractValidator<ReorderSkillStatementCommand>
{
    public ReorderSkillStatementValidation()
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
