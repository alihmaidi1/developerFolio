using DeveloperFolio.Application.Common.Messaging;
using DeveloperFolio.Domain.OperationResult;

namespace DeveloperFolio.Application.Features.Settings.Contact.GetContact;

internal sealed record GetContactQuery : IQuery<TResult<ContactResponse>>;
