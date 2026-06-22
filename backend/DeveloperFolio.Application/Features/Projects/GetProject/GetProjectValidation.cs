using FluentValidation;

namespace DeveloperFolio.Application.Features.Projects.GetProject;

internal sealed class GetProjectValidation : AbstractValidator<GetProjectQuery>
{
    public GetProjectValidation()
    {
        RuleFor(query => query.Id).NotEmpty();
    }
}
