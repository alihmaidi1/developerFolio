using DeveloperFolio.Application.Common.Messaging;
using DeveloperFolio.Domain.OperationResult;

namespace DeveloperFolio.Application.Features.Settings.SocialLinks.DeleteSocialLink;

internal sealed record DeleteSocialLinkCommand(Guid Id) : ICommand<Result>;
