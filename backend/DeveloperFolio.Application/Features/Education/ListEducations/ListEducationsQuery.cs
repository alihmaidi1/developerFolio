using DeveloperFolio.Application.Common.Messaging;
using DeveloperFolio.Application.Features.Education.GetEducation;
using DeveloperFolio.Domain.OperationResult;

namespace DeveloperFolio.Application.Features.Education.ListEducations;

internal sealed record ListEducationsQuery
    : IQuery<TResult<IReadOnlyCollection<EducationResponse>>>;
