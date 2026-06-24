using FluentValidation;

namespace DeveloperFolio.Application.Features.Education.GetEducation;

internal sealed class GetEducationValidation : AbstractValidator<GetEducationQuery>
{
    public GetEducationValidation()
    {
        RuleFor(query => query.Id).NotEmpty();
    }
}
