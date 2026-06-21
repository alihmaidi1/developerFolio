using System.Net;
using Microsoft.AspNetCore.Http;

namespace DeveloperFolio.Domain.OperationResult;

public static class ResultExtensions
{
    public static IResult ToHttpResult<TValue>(this TResult<TValue> result) =>
        result.StatusCode == HttpStatusCode.NoContent
            ? Results.NoContent()
            : Results.Json(result, statusCode: (int)result.StatusCode);

    public static IResult ToHttpResult(this Result result) =>
        result.StatusCode == HttpStatusCode.NoContent
            ? Results.NoContent()
            : Results.Json(result, statusCode: (int)result.StatusCode);
}
