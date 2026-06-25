using Carter;
using DeveloperFolio.Application.Abstractions;
using DeveloperFolio.Application.Features.Projects.Common;
using DeveloperFolio.Application.Features.Uploads.Common;
using DeveloperFolio.Domain.OperationResult;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;

namespace DeveloperFolio.Application.Features.Uploads.UploadWorkExperienceLogo;

public sealed class UploadWorkExperienceLogoEndpoint : ICarterModule
{
    private const string WorkExperienceLogoFolder = "work-experience";

    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("/api/admin/uploads/work-experience-logo", async (
                HttpRequest httpRequest,
                IImageStorageService imageStorage,
                CancellationToken cancellationToken) =>
            {
                var form = await httpRequest.ReadFormAsync(cancellationToken);
                var upload = form.Files["file"].ToImageUpload();
                if (upload is null)
                {
                    return Result.ValidationFailure<UploadImageResponse>(
                        UploadErrors.MissingFile).ToHttpResult();
                }

                var result = await imageStorage.UploadAsync(
                    upload,
                    WorkExperienceLogoFolder,
                    cancellationToken);

                return result.IsFailure
                    ? Result.Failure<UploadImageResponse>(result.Error!, result.StatusCode).ToHttpResult()
                    : Result.Success(new UploadImageResponse(result.Value!)).ToHttpResult();
            })
            .DisableAntiforgery()
            .RequireAuthorization("AdminOnly")
            .WithTags("Uploads")
            .WithSummary("Upload a company logo for a work experience entry");
    }
}
