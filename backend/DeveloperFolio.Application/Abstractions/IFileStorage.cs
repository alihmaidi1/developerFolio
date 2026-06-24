namespace DeveloperFolio.Application.Abstractions;

public interface IFileStorage
{
    Task<string> SaveAsync(Stream stream, string fileName, string folder, CancellationToken cancellationToken);
    Task DeleteAsync(string storageKey, CancellationToken cancellationToken);
}
