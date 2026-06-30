using System.Net;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using DeveloperFolio.Domain.WorkExperience;
using DeveloperFolio.Infrastructure.Persistence;
using FluentAssertions;
using Microsoft.Extensions.DependencyInjection;

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

        var createResponse = await _client.PostAsJsonAsync("/api/admin/projects", new
        {
            title = "Developer Folio",
            summary = "Portfolio project",
            description = "A clean portfolio.",
            imageUrl = "/projects/sample.png",
            repositoryUrl = "https://github.com/example/project",
            liveUrl = "https://example.com",
            technologies = new[] { "React", "TypeScript" },
            isPublished = true,
        });
        createResponse.StatusCode.Should().Be(HttpStatusCode.Created);
        var created = await createResponse.Content.ReadFromJsonAsync<OperationResultResponse<Guid>>();
        created!.IsSuccess.Should().BeTrue();
        created.Value.Should().NotBeEmpty();

        var landingPage = await _client.GetFromJsonAsync<OperationResultResponse<LandingPageResponse>>("/api/landing-page");
        landingPage!.Value!.Projects.Should().ContainSingle(project => project.Title == "Developer Folio");
    }

    [Fact]
    public async Task PublicCanReadPublishedWorkExperienceEntries()
    {
        using (var scope = factory.Services.CreateScope())
        {
            var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
            dbContext.WorkExperienceEntries.Add(WorkExperienceEntry.Create(
                "Senior AI DevOps Engineer",
                "Cloud Platform Team",
                "2024 - Present",
                "Built platform foundations for AI and cloud workloads.",
                "/uploads/work-experience/cloud.png",
                [
                    "Improved deployment reliability across production services.",
                    "Created reusable infrastructure workflows for engineering teams.",
                ],
                0,
                true));
            await dbContext.SaveChangesAsync();
        }

        var response = await _client.GetAsync("/api/landing-page");
        var responseText = await response.Content.ReadAsStringAsync();
        response.StatusCode.Should().Be(HttpStatusCode.OK, responseText);

        var landingPage = await response.Content.ReadFromJsonAsync<OperationResultResponse<LandingPageResponse>>();

        landingPage!.IsSuccess.Should().BeTrue();
        landingPage.Value!.WorkExperiences.Should().ContainSingle(entry =>
            entry.Role == "Senior AI DevOps Engineer" &&
            entry.Company == "Cloud Platform Team" &&
            entry.DescriptionBullets.Length == 2);
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

        var expectedContent = "%PDF-1.4 test resume"u8.ToArray();
        using var form = new MultipartFormDataContent();
        using var file = new ByteArrayContent(expectedContent);
        file.Headers.ContentType = new MediaTypeHeaderValue("application/pdf");
        form.Add(file, "file", "resume.pdf");

        var uploadResponse = await _client.PostAsync("/api/admin/resume", form);
        uploadResponse.EnsureSuccessStatusCode();

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

    private sealed record LoginResponse(Guid Id, string Email);
    private sealed record ProjectResponse(Guid Id, string Title);
    private sealed record LandingPageResponse(
        ProjectResponse[] Projects,
        WorkExperienceResponse[] WorkExperiences);
    private sealed record WorkExperienceResponse(
        Guid Id,
        string Role,
        string Company,
        string Date,
        string? Description,
        string? CompanyLogoUrl,
        string[] DescriptionBullets);
    private sealed record ErrorResponse(string Code, string Message);
    private sealed record OperationResultResponse<T>(
        bool IsSuccess,
        HttpStatusCode StatusCode,
        ErrorResponse? Error,
        T? Value);
}
