using DeveloperFolio.Domain.OperationResult;

namespace DeveloperFolio.Infrastructure.Storage;

internal static class ImageStorageErrors
{
    public static readonly Error MissingFile = new(
        "Image.MissingFile",
        "An image file is required.");

    public static readonly Error UnsupportedType = new(
        "Image.UnsupportedType",
        "The uploaded file type is not allowed.");

    public static readonly Error FileTooLarge = new(
        "Image.FileTooLarge",
        "The uploaded image exceeds the allowed size.");
}
