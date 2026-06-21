using System.Net;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using FluentAssertions;

namespace DeveloperFolio.Tests.Integration;

public sealed class ProjectEndpointsTests(ApiFactory factory) : IClassFixture<ApiFactory>
{
    private readonly HttpClient _client = factory.CreateClient();

    [Fact]
    public async Task AdminCanCreateProjectAndPublicCanReadIt()
    {
        var loginResponse = await _client.PostAsJsonAsync("/api/auth/login", new
        {
            email = "admin@example.com",
            password = "integration-password",
        });
        loginResponse.EnsureSuccessStatusCode();
        var login = await loginResponse.Content.ReadFromJsonAsync<OperationResultResponse<LoginResponse>>();
        _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", login!.Value!.AccessToken);

        var createResponse = await _client.PostAsJsonAsync("/api/admin/projects", new
        {
            title = "Developer Folio",
            summary = "Portfolio project",
            description = "A clean portfolio.",
            imageUrl = "https://example.com/project.png",
            repositoryUrl = "https://github.com/example/project",
            liveUrl = "https://example.com",
            technologies = new[] { "React", "TypeScript" },
            sortOrder = 0,
            isPublished = true,
        });
        createResponse.StatusCode.Should().Be(HttpStatusCode.Created);
        var created = await createResponse.Content.ReadFromJsonAsync<OperationResultResponse<Guid>>();
        created!.IsSuccess.Should().BeTrue();
        created.Value.Should().NotBeEmpty();

        _client.DefaultRequestHeaders.Authorization = null;
        var projects = await _client.GetFromJsonAsync<OperationResultResponse<ProjectResponse[]>>("/api/projects");
        projects!.Value.Should().ContainSingle(project => project.Title == "Developer Folio");
    }

    [Fact]
    public async Task AdminCanUploadAndDownloadResume()
    {
        var loginResponse = await _client.PostAsJsonAsync("/api/auth/login", new
        {
            email = "admin@example.com",
            password = "integration-password",
        });
        loginResponse.EnsureSuccessStatusCode();
        var login = await loginResponse.Content.ReadFromJsonAsync<OperationResultResponse<LoginResponse>>();
        _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", login!.Value!.AccessToken);

        var expectedContent = "%PDF-1.4 test resume"u8.ToArray();
        using var form = new MultipartFormDataContent();
        using var file = new ByteArrayContent(expectedContent);
        file.Headers.ContentType = new MediaTypeHeaderValue("application/pdf");
        form.Add(file, "file", "resume.pdf");

        var uploadResponse = await _client.PostAsync("/api/admin/resume", form);
        uploadResponse.EnsureSuccessStatusCode();

        _client.DefaultRequestHeaders.Authorization = null;
        var downloadedContent = await _client.GetByteArrayAsync("/api/resume/download");
        downloadedContent.Should().Equal(expectedContent);
    }

    [Fact]
    public async Task InvalidLoginReturnsOperationResultError()
    {
        var response = await _client.PostAsJsonAsync("/api/auth/login", new
        {
            email = "admin@example.com",
            password = "wrong-password",
        });

        response.StatusCode.Should().Be(HttpStatusCode.Unauthorized);
        var result = await response.Content.ReadFromJsonAsync<OperationResultResponse<LoginResponse>>();
        result!.IsSuccess.Should().BeFalse();
        result.Error!.Code.Should().Be("Auth.InvalidCredentials");
    }

    [Fact]
    public async Task InvalidRequestReturnsValidationOperationResult()
    {
        var response = await _client.PostAsJsonAsync("/api/auth/login", new
        {
            email = "invalid-email",
            password = "",
        });

        response.StatusCode.Should().Be(HttpStatusCode.UnprocessableEntity);
        var result = await response.Content.ReadFromJsonAsync<OperationResultResponse<LoginResponse>>();
        result!.IsSuccess.Should().BeFalse();
        result.Error!.Code.Should().Be("Error.ValidationFailures");
    }

    private sealed record LoginResponse(string AccessToken);
    private sealed record ProjectResponse(Guid Id, string Title);
    private sealed record ErrorResponse(string Code, string Message);
    private sealed record OperationResultResponse<T>(
        bool IsSuccess,
        HttpStatusCode StatusCode,
        ErrorResponse? Error,
        T? Value);
}
