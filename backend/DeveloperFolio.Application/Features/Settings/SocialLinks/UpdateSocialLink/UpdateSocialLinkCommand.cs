using DeveloperFolio.Application.Common.Messaging;
using DeveloperFolio.Domain.OperationResult;

namespace DeveloperFolio.Application.Features.Settings.SocialLinks.UpdateSocialLink;

internal sealed record UpdateSocialLinkCommand(
    Guid Id,
    string Name,
    string Url,
    string IconClassName,
    bool IsPublished) : ICommand<Result>;
