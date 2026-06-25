using DeveloperFolio.Application.Common.Messaging;
using DeveloperFolio.Domain.OperationResult;

namespace DeveloperFolio.Application.Features.Settings.SocialLinks.CreateSocialLink;

internal sealed record CreateSocialLinkCommand(
    string Name,
    string Url,
    string IconClassName,
    bool IsPublished) : ICommand<TResult<Guid>>;
