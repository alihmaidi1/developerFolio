using MediatR;

namespace DeveloperFolio.Application.Common.Messaging;

public interface ICommand<out TResponse> : IRequest<TResponse>;
public interface IQuery<out TResponse> : IRequest<TResponse>;
