using Carter;
using DeveloperFolio.Application.Abstractions;
using DeveloperFolio.Application.Common.Messaging;
using DeveloperFolio.Application.Features.Projects.Shared;
using DeveloperFolio.Domain.Projects;
using DeveloperFolio.Domain.OperationResult;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;

namespace DeveloperFolio.Application.Features.Projects.CreateProject;

internal sealed record CreateProjectCommand(
    string Title,
    string Summary,
    string? Description,
    string? ImageUrl,
    string? RepositoryUrl,
    string? LiveUrl,
    IReadOnlyCollection<string> Technologies,
    int SortOrder,
    bool IsPublished) : ICommand<TResult<Guid>>;

internal sealed class CreateProjectCommandValidator : AbstractValidator<CreateProjectCommand>
{
    public CreateProjectCommandValidator()
    {
        ProjectRequestValidator.Apply(this, command => command.Title, command => command.Summary,
            command => command.Technologies, command => command.SortOrder);
    }
}

internal sealed class CreateProjectCommandHandler(IApplicationDbContext dbContext)
    : IRequestHandler<CreateProjectCommand, TResult<Guid>>
{
    public async Task<TResult<Guid>> Handle(CreateProjectCommand request, CancellationToken cancellationToken)
    {
        var project = PortfolioProject.Create(
            request.Title,
            request.Summary,
            request.Description,
            request.ImageUrl,
            request.RepositoryUrl,
            request.LiveUrl,
            request.Technologies,
            request.SortOrder,
            request.IsPublished);

        await dbContext.Projects.AddAsync(project, cancellationToken);
        return Result.Created(project.Id);
    }
}

public sealed class CreateProjectEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("/api/admin/projects", async (ProjectRequest request, ISender sender, CancellationToken cancellationToken) =>
            {
                var result = await sender.Send(new CreateProjectCommand(
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
            .WithSummary("Create a project");
    }
}
