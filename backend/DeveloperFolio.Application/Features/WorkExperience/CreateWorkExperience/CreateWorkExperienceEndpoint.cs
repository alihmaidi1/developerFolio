using Carter;
using DeveloperFolio.Domain.OperationResult;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;

namespace DeveloperFolio.Application.Features.WorkExperience.CreateWorkExperience;

public sealed class CreateWorkExperienceEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("/api/admin/work-experience", async (
                CreateWorkExperienceRequest request,
                ISender sender,
                CancellationToken cancellationToken) =>
            {
                var command = new CreateWorkExperienceCommand(
                    request.Role,
                    request.Company,
                    request.Date,
                    request.Description,
                    request.CompanyLogoUrl,
                    request.DescriptionBullets,
                    request.IsPublished);

                var result = await sender.Send(command, cancellationToken);
                return result.ToHttpResult();
            })
            .RequireAuthorization("AdminOnly")
            .WithTags("WorkExperience")
            .WithSummary("Create a work experience entry");
    }
}
