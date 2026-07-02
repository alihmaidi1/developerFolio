using DeveloperFolio.Domain.OperationResult;
using FluentValidation;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;

namespace DeveloperFolio.Api;

internal sealed class GlobalExceptionHandler(
    IProblemDetailsService problemDetailsService,
    ILogger<GlobalExceptionHandler> logger) : IExceptionHandler
{
    public async ValueTask<bool> TryHandleAsync(
        HttpContext httpContext,
        Exception exception,
        CancellationToken cancellationToken)
    {
        if (exception is ValidationException validationException)
        {
            var message = string.Join(
                "; ",
                validationException.Errors.Select(error => error.ErrorMessage).Distinct());
            var result = Result.ValidationFailure<object>(Error.ValidationFailures(message));
            httpContext.Response.StatusCode = (int)result.StatusCode;
            await httpContext.Response.WriteAsJsonAsync(result, cancellationToken);
            return true;
        }

        if (exception is FileNotFoundException)
        {
            var result = Result.NotFound<object>(Error.NotFound("Resource was not found."));
            httpContext.Response.StatusCode = (int)result.StatusCode;
            await httpContext.Response.WriteAsJsonAsync(result, cancellationToken);
            
            return true;
        }

        const int statusCode = StatusCodes.Status500InternalServerError;
        const string title = "Unexpected server error";
        logger.LogError(exception, "Unhandled request exception");

        httpContext.Response.StatusCode = statusCode;
        return await problemDetailsService.TryWriteAsync(new ProblemDetailsContext
        {
            HttpContext = httpContext,
            Exception = exception,
            ProblemDetails = new ProblemDetails
            {
                Status = statusCode,
                Title = title,
                Detail = null,
            },
        });
    }
}
