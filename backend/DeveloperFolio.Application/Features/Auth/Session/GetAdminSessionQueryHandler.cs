using DeveloperFolio.Application.Abstractions;
using DeveloperFolio.Domain.OperationResult;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace DeveloperFolio.Application.Features.Auth.Session;

internal sealed class GetAdminSessionQueryHandler(IApplicationDbContext dbContext)
    : IRequestHandler<GetAdminSessionQuery, TResult<AdminSessionResponse>>
{
    public async Task<TResult<AdminSessionResponse>> Handle(
        GetAdminSessionQuery request,
        CancellationToken cancellationToken)
    {
        var admin = await dbContext.AdminUsers
            .AsNoTracking()
            .SingleOrDefaultAsync(user => user.Id == request.AdminId, cancellationToken);

        return admin is null
            ? Result.Unauthorized<AdminSessionResponse>(
                new Error("Auth.SessionInvalid", "The admin session is no longer valid."))
            : Result.Success(new AdminSessionResponse(admin.Id, admin.Email));
    }
}
