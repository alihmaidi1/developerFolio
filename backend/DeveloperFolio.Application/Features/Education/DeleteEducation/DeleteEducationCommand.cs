using DeveloperFolio.Application.Common.Messaging;
using DeveloperFolio.Domain.OperationResult;

namespace DeveloperFolio.Application.Features.Education.DeleteEducation;

internal sealed record DeleteEducationCommand(Guid Id) : ICommand<Result>;
