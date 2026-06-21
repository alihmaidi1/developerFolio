namespace DeveloperFolio.Domain.OperationResult;

public sealed record Error(string Code, string Message)
{
    public static readonly Error None = new(string.Empty, string.Empty);
    public static readonly Error NullValue = new("Error.NullValue", "The result value is null.");

    public static Error ValidationFailures(string message) => new("Error.ValidationFailures", message);
    public static Error NotFound(string message) => new("Error.NotFound", message);
    public static Error Internal(string message) => new("Error.Internal", message);
}
