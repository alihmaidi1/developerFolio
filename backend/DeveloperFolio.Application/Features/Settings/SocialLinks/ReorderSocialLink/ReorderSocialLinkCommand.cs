using DeveloperFolio.Application.Common.Messaging;
using DeveloperFolio.Domain.OperationResult;

namespace DeveloperFolio.Application.Features.Settings.SocialLinks.ReorderSocialLink;

internal sealed record ReorderSocialLinkCommand(Guid Id, string Direction) : ICommand<Result>;
