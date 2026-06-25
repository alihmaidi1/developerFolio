using FluentValidation;

namespace DeveloperFolio.Application.Features.Skills.SoftwareSkills.GetSoftwareSkill;

internal sealed class GetSoftwareSkillValidation : AbstractValidator<GetSoftwareSkillQuery>
{
    public GetSoftwareSkillValidation()
    {
        RuleFor(query => query.Id).NotEmpty();
    }
}
