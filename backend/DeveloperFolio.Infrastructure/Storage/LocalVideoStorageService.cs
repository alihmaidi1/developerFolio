using DeveloperFolio.Application.Abstractions;
using DeveloperFolio.Domain.OperationResult;
using DeveloperFolio.Infrastructure.Options;
using Microsoft.Extensions.Options;

namespace DeveloperFolio.Infrastructure.Storage;

internal sealed class LocalVideoStorageService(
    IFileStorage fileStorage,
    IOptions<VideoStorageOptions> videoOptions) : IVideoStorageService
{
    private readonly VideoStorageOptions _videoOptions = videoOptions.Value;

    public async Task<TResult<string>> UploadAsync(
        VideoUpload upload,
        string folder,
        CancellationToken cancellationToken)
    {
        if (upload.Length <= 0)
        {
            return Result.ValidationFailure<string>(VideoStorageErrors.MissingFile);
        }

        if (upload.Length > _videoOptions.MaxFileSizeBytes)
        {
            return Result.ValidationFailure<string>(VideoStorageErrors.FileTooLarge);
        }

        if (!_videoOptions.AllowedContentTypes.Contains(upload.ContentType, StringComparer.OrdinalIgnoreCase))
        {
            return Result.ValidationFailure<string>(VideoStorageErrors.UnsupportedType);
        }

        var storageKey = await fileStorage.SaveAsync(
            upload.Content,
            upload.FileName,
            folder,
            cancellationToken);

        return Result.Success($"/{storageKey}");
    }

    public Task RemoveAsync(string? videoUrl, CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(videoUrl))
        {
            return Task.CompletedTask;
        }

        var storageKey = videoUrl.TrimStart('/');
        return string.IsNullOrEmpty(storageKey)
            ? Task.CompletedTask
            : fileStorage.DeleteAsync(storageKey, cancellationToken);
    }
}
