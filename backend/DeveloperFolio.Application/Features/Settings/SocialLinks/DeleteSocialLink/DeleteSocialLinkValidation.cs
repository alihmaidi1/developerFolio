using FluentValidation;

namespace DeveloperFolio.Application.Features.Settings.SocialLinks.DeleteSocialLink;

internal sealed class DeleteSocialLinkValidation : AbstractValidator<DeleteSocialLinkCommand>
{
    public DeleteSocialLinkValidation()
    {
        RuleFor(command => command.Id).NotEmpty();
    }
}
