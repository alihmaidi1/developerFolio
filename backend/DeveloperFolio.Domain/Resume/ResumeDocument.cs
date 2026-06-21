using DeveloperFolio.Domain.Common;

namespace DeveloperFolio.Domain.Resume;

public sealed class ResumeDocument : Entity
{
    private ResumeDocument()
    {
    }

    public string FileName { get; private set; } = string.Empty;
    public string ContentType { get; private set; } = string.Empty;
    public long SizeInBytes { get; private set; }
    public string StorageKey { get; private set; } = string.Empty;

    public static ResumeDocument Create(string fileName, string contentType, long sizeInBytes, string storageKey) =>
        new()
        {
            FileName = fileName,
            ContentType = contentType,
            SizeInBytes = sizeInBytes,
            StorageKey = storageKey,
        };
}
