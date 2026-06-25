using FluentValidation;

namespace DeveloperFolio.Application.Features.Settings.SocialLinks.CreateSocialLink;

internal sealed class CreateSocialLinkValidation : AbstractValidator<CreateSocialLinkCommand>
{
    public CreateSocialLinkValidation()
    {
        RuleFor(command => command.Name).NotEmpty().MaximumLength(80);
        RuleFor(command => command.Url).NotEmpty().MaximumLength(2048);
        RuleFor(command => command.IconClassName).NotEmpty().MaximumLength(160);
    }
}
