using DeveloperFolio.Domain.Resume;

namespace DeveloperFolio.Application.Features.Resume;

public sealed record ResumeResponse(
    string FileName,
    string ContentType,
    long SizeInBytes,
    DateTimeOffset UpdatedAtUtc,
    string DownloadUrl)
{
    internal static ResumeResponse From(ResumeDocument resume) =>
        new(resume.FileName, resume.ContentType, resume.SizeInBytes, resume.UpdatedAtUtc, "/api/resume/download");
}
