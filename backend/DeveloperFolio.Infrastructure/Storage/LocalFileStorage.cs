using DeveloperFolio.Application.Abstractions;
using Microsoft.AspNetCore.Hosting;

namespace DeveloperFolio.Infrastructure.Storage;

internal sealed class LocalFileStorage(IWebHostEnvironment environment) : IFileStorage
{
    public async Task<string> SaveAsync(
        Stream stream,
        string fileName,
        string folder,
        CancellationToken cancellationToken)
    {
        var safeFolder = SanitizeFolder(folder);
        var extension = Path.GetExtension(fileName).ToLowerInvariant();
        var storageKey = $"{safeFolder}/{Guid.NewGuid():N}{extension}";
        var fullPath = Resolve(storageKey);
        Directory.CreateDirectory(Path.GetDirectoryName(fullPath)!);

        await using var output = File.Create(fullPath);
        await stream.CopyToAsync(output, cancellationToken);
        return storageKey;
    }

    public Task DeleteAsync(string storageKey, CancellationToken cancellationToken)
    {
        cancellationToken.ThrowIfCancellationRequested();
        var fullPath = Resolve(storageKey);
        if (File.Exists(fullPath))
        {
            File.Delete(fullPath);
        }

        return Task.CompletedTask;
    }

    private string Resolve(string storageKey)
    {
        var webRoot = Path.GetFullPath(environment.WebRootPath);
        var fullPath = Path.GetFullPath(Path.Combine(webRoot, storageKey));
        var relativePath = Path.GetRelativePath(webRoot, fullPath);
        if (relativePath.StartsWith("..", StringComparison.Ordinal) || Path.IsPathRooted(relativePath))
        {
            throw new InvalidOperationException("Invalid storage key.");
        }

        return fullPath;
    }

    private static string SanitizeFolder(string folder)
    {
        if (string.IsNullOrWhiteSpace(folder))
        {
            throw new ArgumentException("Folder is required.", nameof(folder));
        }

        var trimmed = folder.Trim().Trim('/', '\\');
        if (trimmed.Length == 0 || trimmed.Contains("..", StringComparison.Ordinal))
        {
            throw new ArgumentException("Folder is invalid.", nameof(folder));
        }

        return trimmed;
    }
}
