using DeveloperFolio.Application.Common.Messaging;
using DeveloperFolio.Domain.OperationResult;

namespace DeveloperFolio.Application.Features.WorkExperience.DeleteWorkExperience;

internal sealed record DeleteWorkExperienceCommand(Guid Id) : ICommand<Result>;
