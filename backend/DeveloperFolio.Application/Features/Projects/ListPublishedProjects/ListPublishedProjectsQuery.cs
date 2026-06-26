using DeveloperFolio.Application.Common.Messaging;
using DeveloperFolio.Domain.OperationResult;

namespace DeveloperFolio.Application.Features.Projects.ListPublishedProjects;

internal sealed record ListPublishedProjectsQuery
    : IQuery<TResult<IReadOnlyCollection<PublishedProjectResponse>>>;
