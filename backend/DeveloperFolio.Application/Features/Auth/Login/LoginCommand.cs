using DeveloperFolio.Application.Common.Messaging;
using DeveloperFolio.Domain.OperationResult;

namespace DeveloperFolio.Application.Features.Auth.Login;

internal sealed record LoginCommand(string Email, string Password) : ICommand<TResult<LoginResponse>>;
