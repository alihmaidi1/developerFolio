using DeveloperFolio.Domain.OperationResult;

namespace DeveloperFolio.Application.Features.Uploads.Common;

internal static class UploadErrors
{
    public static readonly Error MissingFile = new(
        "Upload.MissingFile",
        "A file is required.");
}
