using DeveloperFolio.Application.Common.Messaging;
using DeveloperFolio.Domain.OperationResult;

namespace DeveloperFolio.Application.Features.Projects.ReorderProject;

internal sealed record ReorderProjectCommand(Guid Id, string Direction) : ICommand<Result>;
