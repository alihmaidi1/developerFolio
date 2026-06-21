using DeveloperFolio.Domain.Projects;
using FluentAssertions;

namespace DeveloperFolio.Tests.Domain;

public sealed class PortfolioProjectTests
{
    [Fact]
    public void Create_NormalizesAndDeduplicatesTechnologies()
    {
        var project = PortfolioProject.Create(
            " Project ",
            " Summary ",
            null,
            null,
            null,
            null,
            ["React", " react ", "TypeScript"],
            0,
            true);

        project.Title.Should().Be("Project");
        project.Technologies.Select(item => item.Name).Should().Equal("React", "TypeScript");
    }
}
