using FluentValidation;

namespace DeveloperFolio.Application.Features.Settings.SocialLinks.ReorderSocialLink;

internal sealed class ReorderSocialLinkValidation : AbstractValidator<ReorderSocialLinkCommand>
{
    public ReorderSocialLinkValidation()
    {
        RuleFor(command => command.Id).NotEmpty();
        RuleFor(command => command.Direction)
            .NotEmpty()
            .Must(direction =>
                direction.Equals("up", StringComparison.OrdinalIgnoreCase)
                || direction.Equals("down", StringComparison.OrdinalIgnoreCase))
            .WithMessage("Direction must be either 'up' or 'down'.");
    }
}
