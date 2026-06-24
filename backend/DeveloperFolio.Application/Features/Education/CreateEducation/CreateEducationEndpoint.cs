using Carter;
using DeveloperFolio.Domain.OperationResult;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;

namespace DeveloperFolio.Application.Features.Education.CreateEducation;

public sealed class CreateEducationEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("/api/admin/education", async (
                CreateEducationRequest request,
                ISender sender,
                CancellationToken cancellationToken) =>
            {
                var command = new CreateEducationCommand(
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
            .WithSummary("Create an education entry");
    }
}
