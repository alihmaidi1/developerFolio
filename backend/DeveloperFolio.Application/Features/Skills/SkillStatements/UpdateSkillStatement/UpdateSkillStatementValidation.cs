using FluentValidation;

namespace DeveloperFolio.Application.Features.Skills.SkillStatements.UpdateSkillStatement;

internal sealed class UpdateSkillStatementValidation : AbstractValidator<UpdateSkillStatementCommand>
{
    public UpdateSkillStatementValidation()
    {
        RuleFor(command => command.Id).NotEmpty();
        RuleFor(command => command.Text).NotEmpty().MaximumLength(500);
    }
}
