using FluentValidation;
using System.Linq.Expressions;

namespace DeveloperFolio.Application.Features.Projects.Shared;

internal static class ProjectRequestValidator
{
    internal static void Apply<T>(
        AbstractValidator<T> validator,
        Expression<Func<T, string>> title,
        Expression<Func<T, string>> summary,
        Expression<Func<T, IEnumerable<string>>> technologies,
        Expression<Func<T, int>> sortOrder)
    {
        validator.RuleFor(title).NotEmpty().MaximumLength(160);
        validator.RuleFor(summary).NotEmpty().MaximumLength(500);
        validator.RuleFor(technologies).Cascade(CascadeMode.Stop).NotNull().Must(values => values.Count() <= 30)
            .WithMessage("A project can contain at most 30 technologies.");
        validator.RuleForEach(technologies).NotEmpty().MaximumLength(80);
        validator.RuleFor(sortOrder).GreaterThanOrEqualTo(0);
    }
}
