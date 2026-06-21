using System.Net;
using DeveloperFolio.Domain.OperationResult;
using FluentAssertions;

namespace DeveloperFolio.Tests.Domain;

public sealed class OperationResultTests
{
    [Fact]
    public void SuccessContainsValueWithoutError()
    {
        var result = Result.Success("value");

        result.IsSuccess.Should().BeTrue();
        result.StatusCode.Should().Be(HttpStatusCode.OK);
        result.Value.Should().Be("value");
        result.Error.Should().BeNull();
    }

    [Fact]
    public void NotFoundContainsErrorWithoutValue()
    {
        var error = new Error("Project.NotFound", "Project was not found.");
        var result = Result.NotFound<string>(error);

        result.IsFailure.Should().BeTrue();
        result.StatusCode.Should().Be(HttpStatusCode.NotFound);
        result.Value.Should().BeNull();
        result.Error.Should().Be(error);
    }
}
