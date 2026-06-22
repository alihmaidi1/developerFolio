using DeveloperFolio.Application.Common.Messaging;
using DeveloperFolio.Domain.OperationResult;

namespace DeveloperFolio.Application.Features.Projects.DeleteProject;

internal sealed record DeleteProjectCommand(Guid Id) : ICommand<Result>;
