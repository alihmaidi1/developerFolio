using FluentValidation;

namespace DeveloperFolio.Application.Features.Skills.SkillStatements.GetSkillStatement;

internal sealed class GetSkillStatementValidation : AbstractValidator<GetSkillStatementQuery>
{
    public GetSkillStatementValidation()
    {
        RuleFor(query => query.Id).NotEmpty();
    }
}
