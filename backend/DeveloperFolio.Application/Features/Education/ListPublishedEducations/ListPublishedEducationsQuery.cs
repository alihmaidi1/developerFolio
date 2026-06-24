using DeveloperFolio.Application.Common.Messaging;
using DeveloperFolio.Domain.OperationResult;

namespace DeveloperFolio.Application.Features.Education.ListPublishedEducations;

internal sealed record ListPublishedEducationsQuery
    : IQuery<TResult<IReadOnlyCollection<PublishedEducationResponse>>>;
