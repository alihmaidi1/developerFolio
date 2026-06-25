using DeveloperFolio.Application.Abstractions;
using DeveloperFolio.Domain.OperationResult;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace DeveloperFolio.Application.Features.Settings.Contact.GetContact;

internal sealed class GetContactQueryHandler(IApplicationDbContext dbContext)
    : IRequestHandler<GetContactQuery, TResult<ContactResponse>>
{
    public async Task<TResult<ContactResponse>> Handle(
        GetContactQuery request,
        CancellationToken cancellationToken)
    {
        var contact = await dbContext.ContactSettings
            .AsNoTracking()
            .SingleOrDefaultAsync(cancellationToken);

        return contact is null
            ? Result.NotFound<ContactResponse>(ContactErrors.NotInitialized)
            : Result.Success(ContactResponse.From(contact));
    }
}
