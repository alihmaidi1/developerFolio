using DeveloperFolio.Application.Common.Messaging;
using DeveloperFolio.Domain.OperationResult;

namespace DeveloperFolio.Application.Features.Education.ReorderEducation;

internal sealed record ReorderEducationCommand(Guid Id, string Direction) : ICommand<Result>;
