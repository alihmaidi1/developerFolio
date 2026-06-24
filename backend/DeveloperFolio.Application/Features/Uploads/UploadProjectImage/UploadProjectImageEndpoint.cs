using Carter;
using DeveloperFolio.Application.Abstractions;
using DeveloperFolio.Application.Features.Projects.Common;
using DeveloperFolio.Domain.OperationResult;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;

namespace DeveloperFolio.Application.Features.Uploads.UploadProjectImage;

public sealed class UploadProjectImageEndpoint : ICarterModule
{
    private const string ProjectImageFolder = "projects";

    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("/api/admin/uploads/project-image", async (
                HttpRequest httpRequest,
                IImageStorageService imageStorage,
                CancellationToken cancellationToken) =>
            {
                var form = await httpRequest.ReadFormAsync(cancellationToken);
                var upload = form.Files["file"].ToImageUpload();
                if (upload is null)
                {
                    return Result.ValidationFailure<UploadImageResponse>(
                        UploadProjectImageErrors.MissingFile).ToHttpResult();
                }

                var result = await imageStorage.UploadAsync(
                    upload,
                    ProjectImageFolder,
                    cancellationToken);

                return result.IsFailure
                    ? Result.Failure<UploadImageResponse>(result.Error!, result.StatusCode).ToHttpResult()
                    : Result.Success(new UploadImageResponse(result.Value!)).ToHttpResult();
            })
            .DisableAntiforgery()
            .RequireAuthorization("AdminOnly")
            .WithTags("Uploads")
            .WithSummary("Upload an image used by a project");
    }
}
