using FluentValidation;

namespace DeveloperFolio.Application.Features.Skills.SkillStatements.CreateSkillStatement;

internal sealed class CreateSkillStatementValidation : AbstractValidator<CreateSkillStatementCommand>
{
    public CreateSkillStatementValidation()
    {
        RuleFor(command => command.Text).NotEmpty().MaximumLength(500);
    }
}
