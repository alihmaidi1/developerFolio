namespace DeveloperFolio.Application.Abstractions;

public sealed record ImageUpload(
    Stream Content,
    string FileName,
    string ContentType,
    long Length);
