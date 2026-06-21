using System.Net;

namespace DeveloperFolio.Domain.OperationResult;

public class Result
{
    protected Result(bool isSuccess, HttpStatusCode statusCode, Error? error = null)
    {
        if (isSuccess && error is not null)
        {
            throw new InvalidOperationException("Successful results cannot contain errors.");
        }

        if (!isSuccess && error is null)
        {
            throw new InvalidOperationException("Failed results must contain an error.");
        }

        IsSuccess = isSuccess;
        StatusCode = statusCode;
        Error = error;
    }

    public bool IsSuccess { get; }
    public bool IsFailure => !IsSuccess;
    public HttpStatusCode StatusCode { get; }
    public Error? Error { get; }

    public static Result Success() => new(true, HttpStatusCode.OK);
    public static TResult<TValue> Success<TValue>(TValue value) => new(value, true, HttpStatusCode.OK);
    public static TResult<TValue> Created<TValue>(TValue value) => new(value, true, HttpStatusCode.Created);
    public static Result NoContent() => new(true, HttpStatusCode.NoContent);

    public static Result Failure(Error error, HttpStatusCode statusCode) => new(false, statusCode, error);
    public static TResult<TValue> Failure<TValue>(Error error, HttpStatusCode statusCode) =>
        new(default, false, statusCode, error);
    public static Result NotFound(Error error) => Failure(error, HttpStatusCode.NotFound);
    public static TResult<TValue> NotFound<TValue>(Error error) =>
        Failure<TValue>(error, HttpStatusCode.NotFound);
    public static Result ValidationFailure(Error error) => Failure(error, HttpStatusCode.UnprocessableEntity);
    public static TResult<TValue> ValidationFailure<TValue>(Error error) =>
        Failure<TValue>(error, HttpStatusCode.UnprocessableEntity);
    public static Result Conflict(Error error) => Failure(error, HttpStatusCode.Conflict);
    public static TResult<TValue> Conflict<TValue>(Error error) =>
        Failure<TValue>(error, HttpStatusCode.Conflict);
    public static Result Unauthorized(Error error) => Failure(error, HttpStatusCode.Unauthorized);
    public static TResult<TValue> Unauthorized<TValue>(Error error) =>
        Failure<TValue>(error, HttpStatusCode.Unauthorized);
    public static Result Forbidden(Error error) => Failure(error, HttpStatusCode.Forbidden);
    public static TResult<TValue> Forbidden<TValue>(Error error) =>
        Failure<TValue>(error, HttpStatusCode.Forbidden);
    public static Result InternalError(Error error) => Failure(error, HttpStatusCode.InternalServerError);
    public static TResult<TValue> InternalError<TValue>(Error error) =>
        Failure<TValue>(error, HttpStatusCode.InternalServerError);

    public static TResult<TValue> Create<TValue>(TValue? value) =>
        value is null ? InternalError<TValue>(Error.NullValue) : Success(value);
}
