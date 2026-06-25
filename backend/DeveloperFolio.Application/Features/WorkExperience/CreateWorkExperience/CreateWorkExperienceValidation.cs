using FluentValidation;

namespace DeveloperFolio.Application.Features.WorkExperience.CreateWorkExperience;

internal sealed class CreateWorkExperienceValidation : AbstractValidator<CreateWorkExperienceCommand>
{
    public CreateWorkExperienceValidation()
    {
        RuleFor(command => command.Role).NotEmpty().MaximumLength(200);
        RuleFor(command => command.Company).NotEmpty().MaximumLength(200);
        RuleFor(command => command.Date).NotEmpty().MaximumLength(120);
        RuleFor(command => command.Description).MaximumLength(2000);
        RuleFor(command => command.CompanyLogoUrl).MaximumLength(2048);

        RuleFor(command => command.DescriptionBullets)
            .Must(bullets => bullets is null || bullets.Count <= 10)
            .WithMessage("An entry can contain at most 10 bullets.");

        RuleForEach(command => command.DescriptionBullets)
            .NotEmpty()
            .MaximumLength(300);
    }
}
