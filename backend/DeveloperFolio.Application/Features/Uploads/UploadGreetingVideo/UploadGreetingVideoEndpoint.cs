using Carter;
using DeveloperFolio.Application.Abstractions;
using DeveloperFolio.Application.Features.Projects.Common;
using DeveloperFolio.Application.Features.Uploads.Common;
using DeveloperFolio.Domain.OperationResult;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;

namespace DeveloperFolio.Application.Features.Uploads.UploadGreetingVideo;

public sealed class UploadGreetingVideoEndpoint : ICarterModule
{
    private const string GreetingVideoFolder = "intro";

    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("/api/admin/uploads/greeting-video", async (
                HttpRequest httpRequest,
                IVideoStorageService videoStorage,
                CancellationToken cancellationToken) =>
            {
                var form = await httpRequest.ReadFormAsync(cancellationToken);
                var upload = form.Files["file"].ToVideoUpload();
                if (upload is null)
                {
                    return Result.ValidationFailure<UploadImageResponse>(
                        UploadErrors.MissingFile).ToHttpResult();
                }

                var result = await videoStorage.UploadAsync(
                    upload,
                    GreetingVideoFolder,
                    cancellationToken);

                return result.IsFailure
                    ? Result.Failure<UploadImageResponse>(result.Error!, result.StatusCode).ToHttpResult()
                    : Result.Success(new UploadImageResponse(result.Value!)).ToHttpResult();
            })
            .DisableAntiforgery()
            .RequireAuthorization("AdminOnly")
            .WithTags("Uploads")
            .WithSummary("Upload the greeting intro video");
    }
}
