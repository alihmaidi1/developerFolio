using System.Net;

namespace DeveloperFolio.Domain.OperationResult;

public sealed class TResult<TValue> : Result
{
    internal TResult(
        TValue? value,
        bool isSuccess,
        HttpStatusCode statusCode,
        Error? error = null)
        : base(isSuccess, statusCode, error)
    {
        Value = value;
    }

    public TValue? Value { get; }
}
