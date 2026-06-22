using DeveloperFolio.Application.Common.Messaging;
using DeveloperFolio.Domain.OperationResult;

namespace DeveloperFolio.Application.Features.Auth.Logout;

internal sealed record LogoutCommand : ICommand<Result>;
