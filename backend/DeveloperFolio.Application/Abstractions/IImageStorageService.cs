using DeveloperFolio.Domain.OperationResult;

namespace DeveloperFolio.Application.Abstractions;

public interface IImageStorageService
{
    Task<TResult<string>> UploadAsync(ImageUpload upload, string folder, CancellationToken cancellationToken);
    Task RemoveAsync(string? imageUrl, CancellationToken cancellationToken);
}
