namespace DeveloperFolio.Application.Features.Auth.Login;

public sealed record LoginResponse(Guid Id, string Email, string AccessToken);
