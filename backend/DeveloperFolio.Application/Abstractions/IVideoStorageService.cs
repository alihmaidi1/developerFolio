using DeveloperFolio.Domain.OperationResult;

namespace DeveloperFolio.Application.Abstractions;

public interface IVideoStorageService
{
    Task<TResult<string>> UploadAsync(VideoUpload upload, string folder, CancellationToken cancellationToken);
    Task RemoveAsync(string? videoUrl, CancellationToken cancellationToken);
}
