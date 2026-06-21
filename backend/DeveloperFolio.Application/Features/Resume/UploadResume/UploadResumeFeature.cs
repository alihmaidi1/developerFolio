using Carter;
using DeveloperFolio.Application.Abstractions;
using DeveloperFolio.Application.Common.Messaging;
using DeveloperFolio.Domain.Resume;
using DeveloperFolio.Domain.OperationResult;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;

namespace DeveloperFolio.Application.Features.Resume.UploadResume;

internal sealed record UploadResumeCommand(
    Stream Stream,
    string FileName,
    string ContentType,
    long SizeInBytes) : ICommand<TResult<UploadResumeResult>>;

internal sealed record UploadResumeResult(ResumeResponse Resume, string? ReplacedStorageKey);

internal sealed class UploadResumeCommandValidator : AbstractValidator<UploadResumeCommand>
{
    private const long MaximumSize = 10 * 1024 * 1024;

    public UploadResumeCommandValidator()
    {
        RuleFor(command => command.FileName)
            .NotEmpty()
            .Must(fileName => Path.GetExtension(fileName).Equals(".pdf", StringComparison.OrdinalIgnoreCase))
            .WithMessage("Only PDF files are allowed.");
        RuleFor(command => command.ContentType)
            .Equal("application/pdf")
            .WithMessage("Only PDF files are allowed.");
        RuleFor(command => command.SizeInBytes)
            .GreaterThan(0)
            .LessThanOrEqualTo(MaximumSize)
            .WithMessage("The resume must not exceed 10 MB.");
    }
}

internal sealed class UploadResumeCommandHandler(IApplicationDbContext dbContext, IFileStorage fileStorage)
    : IRequestHandler<UploadResumeCommand, TResult<UploadResumeResult>>
{
    public async Task<TResult<UploadResumeResult>> Handle(
        UploadResumeCommand request,
        CancellationToken cancellationToken)
    {
        var current = await dbContext.ResumeDocuments.SingleOrDefaultAsync(cancellationToken);
        var storageKey = await fileStorage.SaveAsync(request.Stream, request.FileName, cancellationToken);
        var resume = ResumeDocument.Create(request.FileName, request.ContentType, request.SizeInBytes, storageKey);

        if (current is not null)
        {
            dbContext.ResumeDocuments.Remove(current);
        }

        await dbContext.ResumeDocuments.AddAsync(resume, cancellationToken);
        return Result.Success(new UploadResumeResult(ResumeResponse.From(resume), current?.StorageKey));
    }
}

public sealed class UploadResumeEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("/api/admin/resume", async (
                IFormFile file,
                ISender sender,
                IFileStorage fileStorage,
                CancellationToken cancellationToken) =>
            {
                await using var stream = file.OpenReadStream();
                var result = await sender.Send(
                    new UploadResumeCommand(stream, file.FileName, file.ContentType, file.Length),
                    cancellationToken);

                if (result.IsSuccess && result.Value?.ReplacedStorageKey is not null)
                {
                    await fileStorage.DeleteAsync(result.Value.ReplacedStorageKey, cancellationToken);
                }

                return result.ToHttpResult();
            })
            .DisableAntiforgery()
            .RequireAuthorization("AdminOnly")
            .WithTags("Admin / Resume")
            .WithSummary("Upload or replace the resume");
    }
}
