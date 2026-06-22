using DeveloperFolio.Application.Common.Messaging;
using DeveloperFolio.Domain.OperationResult;

namespace DeveloperFolio.Application.Features.Projects.GetProject;

internal sealed record GetProjectQuery(Guid Id) : IQuery<TResult<ProjectResponse>>;
