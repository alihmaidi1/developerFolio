using DeveloperFolio.Application.Common.Messaging;
using DeveloperFolio.Domain.OperationResult;

namespace DeveloperFolio.Application.Features.WorkExperience.ReorderWorkExperience;

internal sealed record ReorderWorkExperienceCommand(Guid Id, string Direction) : ICommand<Result>;
