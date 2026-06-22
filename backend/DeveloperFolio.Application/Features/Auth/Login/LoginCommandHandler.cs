using DeveloperFolio.Application.Abstractions;
using DeveloperFolio.Domain.OperationResult;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace DeveloperFolio.Application.Features.Auth.Login;

internal sealed class LoginCommandHandler(
    IApplicationDbContext dbContext,
    IPasswordHasher passwordHasher,
    IJwtTokenService jwtTokenService,
    IAdminSessionCookie sessionCookie)
    : IRequestHandler<LoginCommand, TResult<LoginResponse>>
{
    public async Task<TResult<LoginResponse>> Handle(LoginCommand request, CancellationToken cancellationToken)
    {
        var email = request.Email.Trim().ToLowerInvariant();
        var admin = await dbContext.AdminUsers
            .AsNoTracking()
            .SingleOrDefaultAsync(user => user.Email == email, cancellationToken);

        if (admin is null || !passwordHasher.Verify(request.Password, admin.PasswordHash))
        {
            return Result.Unauthorized<LoginResponse>(
                new Error("Auth.InvalidCredentials", "Email or password is incorrect."));
        }

        sessionCookie.Set(jwtTokenService.Create(admin));
        return Result.Success(new LoginResponse(admin.Id, admin.Email));
    }
}
