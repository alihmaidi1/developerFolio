using DeveloperFolio.Domain.Common;
using FluentAssertions;
using NetArchTest.Rules;
using ApplicationDependencyInjection = DeveloperFolio.Application.DependencyInjection;
using InfrastructureDependencyInjection = DeveloperFolio.Infrastructure.DependencyInjection;

namespace DeveloperFolio.Tests.Architecture;

public sealed class LayerTests
{
    [Fact]
    public void Domain_DoesNotDependOnOuterLayers()
    {
        var result = Types.InAssembly(typeof(Entity).Assembly)
            .ShouldNot()
            .HaveDependencyOnAny(
                typeof(ApplicationDependencyInjection).Assembly.GetName().Name!,
                typeof(InfrastructureDependencyInjection).Assembly.GetName().Name!,
                typeof(Program).Assembly.GetName().Name!)
            .GetResult();

        result.IsSuccessful.Should().BeTrue();
    }

    [Fact]
    public void Application_DoesNotDependOnInfrastructureOrApi()
    {
        var result = Types.InAssembly(typeof(ApplicationDependencyInjection).Assembly)
            .ShouldNot()
            .HaveDependencyOnAny(
                typeof(InfrastructureDependencyInjection).Assembly.GetName().Name!,
                typeof(Program).Assembly.GetName().Name!)
            .GetResult();

        result.IsSuccessful.Should().BeTrue();
    }

    [Fact]
    public void Infrastructure_DoesNotDependOnApi()
    {
        var result = Types.InAssembly(typeof(InfrastructureDependencyInjection).Assembly)
            .ShouldNot()
            .HaveDependencyOn(typeof(Program).Assembly.GetName().Name!)
            .GetResult();

        result.IsSuccessful.Should().BeTrue();
    }
}
