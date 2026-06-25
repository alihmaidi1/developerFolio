using DeveloperFolio.Application.Common.Messaging;
using DeveloperFolio.Domain.OperationResult;

namespace DeveloperFolio.Application.Features.Settings.SocialLinks.GetSocialLink;

internal sealed record GetSocialLinkQuery(Guid Id) : IQuery<TResult<SocialLinkResponse>>;
