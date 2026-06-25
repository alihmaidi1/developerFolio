using FluentValidation;

namespace DeveloperFolio.Application.Features.Skills.SkillStatements.DeleteSkillStatement;

internal sealed class DeleteSkillStatementValidation : AbstractValidator<DeleteSkillStatementCommand>
{
    public DeleteSkillStatementValidation()
    {
        RuleFor(command => command.Id).NotEmpty();
    }
}
