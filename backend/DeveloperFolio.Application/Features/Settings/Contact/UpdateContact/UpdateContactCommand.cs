using DeveloperFolio.Application.Common.Messaging;
using DeveloperFolio.Domain.OperationResult;

namespace DeveloperFolio.Application.Features.Settings.Contact.UpdateContact;

internal sealed record UpdateContactCommand(
    string Title,
    string Subtitle,
    string? Email,
    string? Phone,
    string? Address) : ICommand<Result>;
