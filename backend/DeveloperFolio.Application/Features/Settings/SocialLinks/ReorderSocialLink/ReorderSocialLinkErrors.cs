using DeveloperFolio.Domain.OperationResult;

namespace DeveloperFolio.Application.Features.Settings.SocialLinks.ReorderSocialLink;

internal static class ReorderSocialLinkErrors
{
    public static readonly Error NotFound = new(
        "Settings.SocialLink.NotFound",
        "The requested social link was not found.");
}
