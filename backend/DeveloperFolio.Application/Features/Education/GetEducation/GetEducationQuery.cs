using DeveloperFolio.Application.Common.Messaging;
using DeveloperFolio.Domain.OperationResult;

namespace DeveloperFolio.Application.Features.Education.GetEducation;

internal sealed record GetEducationQuery(Guid Id) : IQuery<TResult<EducationResponse>>;
