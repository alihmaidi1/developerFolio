using FluentValidation;

namespace DeveloperFolio.Application.Features.Projects.UpdateProject;

internal sealed class UpdateProjectValidation : AbstractValidator<UpdateProjectCommand>
{
    public UpdateProjectValidation()
    {
        RuleFor(command => command.Id).NotEmpty();

        RuleFor(command => command.Title)
            .NotEmpty()
            .MaximumLength(160);

        RuleFor(command => command.Summary)
            .NotEmpty()
            .MaximumLength(500);

        RuleFor(command => command.Description)
            .MaximumLength(5000);

        RuleFor(command => command.ImageUrl)
            .MaximumLength(2048);

        ApplyUrlRule(command => command.RepositoryUrl);
        ApplyUrlRule(command => command.LiveUrl);

        RuleFor(command => command.Technologies)
            .Cascade(CascadeMode.Stop)
            .NotNull()
            .Must(technologies => technologies!.Count <= 30)
            .WithMessage("A project can contain at most 30 technologies.");

        RuleForEach(command => command.Technologies)
            .NotEmpty()
            .MaximumLength(80);
    }

    private void ApplyUrlRule(System.Linq.Expressions.Expression<Func<UpdateProjectCommand, string?>> expression)
    {
        RuleFor(expression)
            .MaximumLength(2048)
            .Must(BeValidOptionalUrl)
            .WithMessage("'{PropertyName}' must be a valid HTTP or HTTPS URL.");
    }

    private static bool BeValidOptionalUrl(string? value)
    {
        if (string.IsNullOrWhiteSpace(value))
        {
            return true;
        }

        return Uri.TryCreate(value, UriKind.Absolute, out var uri)
            && (uri.Scheme == Uri.UriSchemeHttp || uri.Scheme == Uri.UriSchemeHttps);
    }
}
