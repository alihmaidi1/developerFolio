using FluentValidation;

namespace DeveloperFolio.Application.Features.Education.ReorderEducation;

internal sealed class ReorderEducationValidation : AbstractValidator<ReorderEducationCommand>
{
    public ReorderEducationValidation()
    {
        RuleFor(command => command.Id).NotEmpty();
        RuleFor(command => command.Direction)
            .Cascade(CascadeMode.Stop)
            .NotEmpty()
            .Must(direction =>
                string.Equals(direction, "up", StringComparison.OrdinalIgnoreCase)
                || string.Equals(direction, "down", StringComparison.OrdinalIgnoreCase))
            .WithMessage("Direction must be either 'up' or 'down'.");
    }
}
