using FluentValidation;

namespace DeveloperFolio.Application.Features.Settings.SocialLinks.GetSocialLink;

internal sealed class GetSocialLinkValidation : AbstractValidator<GetSocialLinkQuery>
{
    public GetSocialLinkValidation()
    {
        RuleFor(query => query.Id).NotEmpty();
    }
}
