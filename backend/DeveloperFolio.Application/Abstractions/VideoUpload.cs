namespace DeveloperFolio.Application.Abstractions;

public sealed record VideoUpload(
    Stream Content,
    string FileName,
    string ContentType,
    long Length);
