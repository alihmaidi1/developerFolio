using Carter;
using DeveloperFolio.Application.Abstractions;
using DeveloperFolio.Application.Common.Messaging;
using DeveloperFolio.Application.Features.Projects.Shared;
using DeveloperFolio.Domain.OperationResult;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;

namespace DeveloperFolio.Application.Features.Projects.UpdateProject;

internal sealed record UpdateProjectCommand(
    Guid Id,
    string Title,
    string Summary,
    string? Description,
    string? ImageUrl,
    string? RepositoryUrl,
    string? LiveUrl,
    IReadOnlyCollection<string> Technologies,
    int SortOrder,
    bool IsPublished) : ICommand<Result>;

internal sealed class UpdateProjectCommandValidator : AbstractValidator<UpdateProjectCommand>
{
    public UpdateProjectCommandValidator()
    {
        RuleFor(command => command.Id).NotEmpty();
        ProjectRequestValidator.Apply(this, command => command.Title, command => command.Summary,
            command => command.Technologies, command => command.SortOrder);
    }
}

internal sealed class UpdateProjectCommandHandler(IApplicationDbContext dbContext)
    : IRequestHandler<UpdateProjectCommand, Result>
{
    public async Task<Result> Handle(UpdateProjectCommand request, CancellationToken cancellationToken)
    {
        var project = await dbContext.Projects
            .Include(item => item.Technologies)
            .SingleOrDefaultAsync(item => item.Id == request.Id, cancellationToken);
        if (project is null)
        {
            return Result.NotFound(new Error("Project.NotFound", "Project was not found."));
        }

        project.Update(
            request.Title,
            request.Summary,
            request.Description,
            request.ImageUrl,
            request.RepositoryUrl,
            request.LiveUrl,
            request.Technologies,
            request.SortOrder,
            request.IsPublished);

        return Result.NoContent();
    }
}

public sealed class UpdateProjectEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPut("/api/admin/projects/{id:guid}", async (
                Guid id,
                ProjectRequest request,
                ISender sender,
                CancellationToken cancellationToken) =>
            {
                var result = await sender.Send(new UpdateProjectCommand(
                    id,
                    request.Title,
                    request.Summary,
                    request.Description,
                    request.ImageUrl,
                    request.RepositoryUrl,
                    request.LiveUrl,
                    request.Technologies,
                    request.SortOrder,
                    request.IsPublished), cancellationToken);

                return result.ToHttpResult();
            })
            .RequireAuthorization("AdminOnly")
            .WithTags("Admin / Projects")
            .WithSummary("Update a project");
    }
}
