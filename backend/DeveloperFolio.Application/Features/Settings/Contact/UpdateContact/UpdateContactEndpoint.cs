using Carter;
using DeveloperFolio.Domain.OperationResult;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;

namespace DeveloperFolio.Application.Features.Settings.Contact.UpdateContact;

public sealed class UpdateContactEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPut("/api/admin/settings/contact", async (
                UpdateContactRequest request,
                ISender sender,
                CancellationToken cancellationToken) =>
            {
                var command = new UpdateContactCommand(
                    request.Title,
                    request.Subtitle,
                    request.Email,
                    request.Phone,
                    request.Address);

                var result = await sender.Send(command, cancellationToken);
                return result.ToHttpResult();
            })
            .RequireAuthorization("AdminOnly")
            .WithTags("Settings")
            .WithSummary("Update contact settings");
    }
}
