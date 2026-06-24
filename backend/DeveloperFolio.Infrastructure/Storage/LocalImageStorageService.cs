using DeveloperFolio.Application.Abstractions;
using DeveloperFolio.Domain.OperationResult;
using DeveloperFolio.Infrastructure.Options;
using Microsoft.Extensions.Options;

namespace DeveloperFolio.Infrastructure.Storage;

internal sealed class LocalImageStorageService(
    IFileStorage fileStorage,
    IOptions<ImageStorageOptions> imageOptions) : IImageStorageService
{
    private readonly ImageStorageOptions _imageOptions = imageOptions.Value;

    public async Task<TResult<string>> UploadAsync(
        ImageUpload upload,
        string folder,
        CancellationToken cancellationToken)
    {
        if (upload.Length <= 0)
        {
            return Result.ValidationFailure<string>(ImageStorageErrors.MissingFile);
        }

        if (upload.Length > _imageOptions.MaxFileSizeBytes)
        {
            return Result.ValidationFailure<string>(ImageStorageErrors.FileTooLarge);
        }

        if (!_imageOptions.AllowedContentTypes.Contains(upload.ContentType, StringComparer.OrdinalIgnoreCase))
        {
            return Result.ValidationFailure<string>(ImageStorageErrors.UnsupportedType);
        }

        var storageKey = await fileStorage.SaveAsync(
            upload.Content,
            upload.FileName,
            folder,
            cancellationToken);

        return Result.Success($"/{storageKey}");
    }

    public Task RemoveAsync(string? imageUrl, CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(imageUrl))
        {
            return Task.CompletedTask;
        }

        var storageKey = imageUrl.TrimStart('/');
        return string.IsNullOrEmpty(storageKey)
            ? Task.CompletedTask
            : fileStorage.DeleteAsync(storageKey, cancellationToken);
    }
}
