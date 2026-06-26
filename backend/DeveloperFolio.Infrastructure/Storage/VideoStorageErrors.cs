using DeveloperFolio.Domain.OperationResult;

namespace DeveloperFolio.Infrastructure.Storage;

internal static class VideoStorageErrors
{
    public static readonly Error MissingFile = new(
        "Video.MissingFile",
        "A video file is required.");

    public static readonly Error UnsupportedType = new(
        "Video.UnsupportedType",
        "The uploaded file type is not allowed.");

    public static readonly Error FileTooLarge = new(
        "Video.FileTooLarge",
        "The uploaded video exceeds the allowed size.");
}
