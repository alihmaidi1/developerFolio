using FluentValidation;

namespace DeveloperFolio.Application.Features.Education.DeleteEducation;

internal sealed class DeleteEducationValidation : AbstractValidator<DeleteEducationCommand>
{
    public DeleteEducationValidation()
    {
        RuleFor(command => command.Id).NotEmpty();
    }
}
