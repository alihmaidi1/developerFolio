using DeveloperFolio.Domain.OperationResult;

namespace DeveloperFolio.Application.Features.Settings.SocialLinks.DeleteSocialLink;

internal static class DeleteSocialLinkErrors
{
    public static readonly Error NotFound = new(
        "Settings.SocialLink.NotFound",
        "The requested social link was not found.");
}
