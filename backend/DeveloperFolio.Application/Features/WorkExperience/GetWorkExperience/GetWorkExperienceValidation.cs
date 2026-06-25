using FluentValidation;

namespace DeveloperFolio.Application.Features.WorkExperience.GetWorkExperience;

internal sealed class GetWorkExperienceValidation : AbstractValidator<GetWorkExperienceQuery>
{
    public GetWorkExperienceValidation()
    {
        RuleFor(query => query.Id).NotEmpty();
    }
}
