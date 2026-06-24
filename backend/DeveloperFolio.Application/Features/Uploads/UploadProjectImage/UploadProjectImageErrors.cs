using DeveloperFolio.Domain.OperationResult;

namespace DeveloperFolio.Application.Features.Uploads.UploadProjectImage;

internal static class UploadProjectImageErrors
{
    public static readonly Error MissingFile = new(
        "Upload.MissingFile",
        "A file is required.");
}
