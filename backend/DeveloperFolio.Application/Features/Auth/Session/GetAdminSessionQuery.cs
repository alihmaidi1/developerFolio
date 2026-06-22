using DeveloperFolio.Application.Common.Messaging;
using DeveloperFolio.Domain.OperationResult;

namespace DeveloperFolio.Application.Features.Auth.Session;

internal sealed record GetAdminSessionQuery(Guid AdminId) : IQuery<TResult<AdminSessionResponse>>;
