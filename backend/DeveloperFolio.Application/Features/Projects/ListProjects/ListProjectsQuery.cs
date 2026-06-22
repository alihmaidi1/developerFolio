using DeveloperFolio.Application.Common.Messaging;
using DeveloperFolio.Domain.OperationResult;

namespace DeveloperFolio.Application.Features.Projects.ListProjects;

internal sealed record ListProjectsQuery
    : IQuery<TResult<IReadOnlyCollection<ListProjectResponse>>>;
