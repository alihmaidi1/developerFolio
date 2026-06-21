using Carter;
using DeveloperFolio.Application.Abstractions;
using DeveloperFolio.Application.Common.Messaging;
using DeveloperFolio.Domain.OperationResult;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;

namespace DeveloperFolio.Application.Features.Resume.GetResume;

internal sealed record GetResumeQuery : IQuery<TResult<ResumeResponse>>;
internal sealed record DownloadResumeQuery : IQuery<TResult<ResumeDownload>>;
internal sealed record ResumeDownload(Stream Stream, string ContentType, string FileName);

internal sealed class GetResumeQueryHandler(IApplicationDbContext dbContext)
    : IRequestHandler<GetResumeQuery, TResult<ResumeResponse>>
{
    public async Task<TResult<ResumeResponse>> Handle(GetResumeQuery request, CancellationToken cancellationToken)
    {
        var resume = await dbContext.ResumeDocuments.AsNoTracking()
            .SingleOrDefaultAsync(cancellationToken);
        if (resume is null)
        {
            return Result.NotFound<ResumeResponse>(
                new Error("Resume.NotFound", "Resume was not found."));
        }

        return Result.Success(ResumeResponse.From(resume));
    }
}

internal sealed class DownloadResumeQueryHandler(IApplicationDbContext dbContext, IFileStorage fileStorage)
    : IRequestHandler<DownloadResumeQuery, TResult<ResumeDownload>>
{
    public async Task<TResult<ResumeDownload>> Handle(
        DownloadResumeQuery request,
        CancellationToken cancellationToken)
    {
        var resume = await dbContext.ResumeDocuments.AsNoTracking()
            .SingleOrDefaultAsync(cancellationToken);
        if (resume is null)
        {
            return Result.NotFound<ResumeDownload>(
                new Error("Resume.NotFound", "Resume was not found."));
        }

        var stream = await fileStorage.OpenReadAsync(resume.StorageKey, cancellationToken);

        return Result.Success(new ResumeDownload(stream, resume.ContentType, resume.FileName));
    }
}

public sealed class GetResumeEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("/api/resume", async (ISender sender, CancellationToken cancellationToken) =>
                (await sender.Send(new GetResumeQuery(), cancellationToken)).ToHttpResult())
            .AllowAnonymous()
            .WithTags("Resume")
            .WithSummary("Get resume metadata");

        app.MapGet("/api/resume/download", async (ISender sender, CancellationToken cancellationToken) =>
            {
                var result = await sender.Send(new DownloadResumeQuery(), cancellationToken);
                if (result.IsFailure)
                {
                    return result.ToHttpResult();
                }

                var resume = result.Value!;
                return Results.File(resume.Stream, resume.ContentType, resume.FileName, enableRangeProcessing: true);
            })
            .AllowAnonymous()
            .WithTags("Resume")
            .WithSummary("Download the current resume");
    }
}
