using FluentValidation;

namespace DeveloperFolio.Application.Features.WorkExperience.DeleteWorkExperience;

internal sealed class DeleteWorkExperienceValidation : AbstractValidator<DeleteWorkExperienceCommand>
{
    public DeleteWorkExperienceValidation()
    {
        RuleFor(command => command.Id).NotEmpty();
    }
}
