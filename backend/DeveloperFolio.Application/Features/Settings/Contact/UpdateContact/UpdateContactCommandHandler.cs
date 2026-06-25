using DeveloperFolio.Application.Abstractions;
using DeveloperFolio.Domain.OperationResult;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace DeveloperFolio.Application.Features.Settings.Contact.UpdateContact;

internal sealed class UpdateContactCommandHandler(IApplicationDbContext dbContext)
    : IRequestHandler<UpdateContactCommand, Result>
{
    public async Task<Result> Handle(UpdateContactCommand request, CancellationToken cancellationToken)
    {
        var contact = await dbContext.ContactSettings
            .SingleOrDefaultAsync(cancellationToken);

        if (contact is null)
        {
            return Result.NotFound(ContactErrors.NotInitialized);
        }

        contact.Update(
            request.Title,
            request.Subtitle,
            request.Email,
            request.Phone,
            request.Address);

        return Result.NoContent();
    }
}
