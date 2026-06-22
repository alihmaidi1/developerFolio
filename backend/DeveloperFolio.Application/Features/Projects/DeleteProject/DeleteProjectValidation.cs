using FluentValidation;

namespace DeveloperFolio.Application.Features.Projects.DeleteProject;

internal sealed class DeleteProjectValidation : AbstractValidator<DeleteProjectCommand>
{
    public DeleteProjectValidation()
    {
        RuleFor(command => command.Id).NotEmpty();
    }
}
