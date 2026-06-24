using FluentValidation;

namespace DeveloperFolio.Application.Features.Education.CreateEducation;

internal sealed class CreateEducationValidation : AbstractValidator<CreateEducationCommand>
{
    public CreateEducationValidation()
    {
        RuleFor(command => command.SchoolName).NotEmpty().MaximumLength(200);
        RuleFor(command => command.Degree).NotEmpty().MaximumLength(200);
        RuleFor(command => command.Duration).NotEmpty().MaximumLength(120);
        RuleFor(command => command.Description).MaximumLength(2000);
        RuleFor(command => command.LogoUrl).MaximumLength(2048);

        RuleFor(command => command.DescriptionBullets)
            .Must(bullets => bullets is null || bullets.Count <= 10)
            .WithMessage("An entry can contain at most 10 bullets.");

        RuleForEach(command => command.DescriptionBullets)
            .NotEmpty()
            .MaximumLength(300);
    }
}
