using DeveloperFolio.Application.Common.Messaging;
using DeveloperFolio.Domain.OperationResult;

namespace DeveloperFolio.Application.Features.Settings.Greeting.GetGreeting;

internal sealed record GetGreetingQuery : IQuery<TResult<GreetingResponse>>;
