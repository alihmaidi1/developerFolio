using Carter;
using DeveloperFolio.Domain.OperationResult;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;

namespace DeveloperFolio.Application.Features.Education.UpdateEducation;

public sealed class UpdateEducationEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPut("/api/admin/education/{id:guid}", async (
                Guid id,
                UpdateEducationRequest request,
                ISender sender,
                CancellationToken cancellationToken) =>
            {
                var command = new UpdateEducationCommand(
                    id,
                    request.SchoolName,
                    request.Degree,
                    request.Duration,
                    request.Description,
                    request.LogoUrl,
                    request.DescriptionBullets,
                    request.IsPublished);

                var result = await sender.Send(command, cancellationToken);
                return result.ToHttpResult();
            })
            .RequireAuthorization("AdminOnly")
            .WithTags("Education")
            .WithSummary("Update an education entry");
    }
}
