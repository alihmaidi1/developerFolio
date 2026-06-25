using FluentValidation;

namespace DeveloperFolio.Application.Features.Settings.SocialLinks.UpdateSocialLink;

internal sealed class UpdateSocialLinkValidation : AbstractValidator<UpdateSocialLinkCommand>
{
    public UpdateSocialLinkValidation()
    {
        RuleFor(command => command.Id).NotEmpty();
        RuleFor(command => command.Name).NotEmpty().MaximumLength(80);
        RuleFor(command => command.Url).NotEmpty().MaximumLength(2048);
        RuleFor(command => command.IconClassName).NotEmpty().MaximumLength(160);
    }
}
