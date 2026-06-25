using DeveloperFolio.Application.Common.Messaging;
using DeveloperFolio.Application.Features.Settings.SocialLinks.GetSocialLink;
using DeveloperFolio.Domain.OperationResult;

namespace DeveloperFolio.Application.Features.Settings.SocialLinks.ListSocialLinks;

internal sealed record ListSocialLinksQuery
    : IQuery<TResult<IReadOnlyCollection<SocialLinkResponse>>>;
