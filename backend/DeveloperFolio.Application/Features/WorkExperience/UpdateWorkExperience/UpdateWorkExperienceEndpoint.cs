using Carter;
using DeveloperFolio.Domain.OperationResult;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;

namespace DeveloperFolio.Application.Features.WorkExperience.UpdateWorkExperience;

public sealed class UpdateWorkExperienceEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPut("/api/admin/work-experience/{id:guid}", async (
                Guid id,
                UpdateWorkExperienceRequest request,
                ISender sender,
                CancellationToken cancellationToken) =>
            {
                var command = new UpdateWorkExperienceCommand(
                    id,
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
            .WithSummary("Update a work experience entry");
    }
}
