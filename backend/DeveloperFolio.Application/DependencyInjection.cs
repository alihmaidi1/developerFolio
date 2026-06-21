using Carter;
using DeveloperFolio.Application.Common.Behaviors;
using FluentValidation;
using MediatR;
using Microsoft.Extensions.DependencyInjection;

namespace DeveloperFolio.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        services.AddCarter(configurator: configurator =>
        {
            configurator.WithValidatorLifetime(ServiceLifetime.Scoped);
            var modules = AssemblyReference.Assembly.GetTypes()
                .Where(type => type.IsAssignableTo(typeof(ICarterModule)))
                .ToArray();
            configurator.WithModules(modules);
        });

        services.AddMediatR(configuration =>
            configuration.RegisterServicesFromAssembly(AssemblyReference.Assembly));
        services.AddValidatorsFromAssembly(
            AssemblyReference.Assembly,
            ServiceLifetime.Scoped,
            includeInternalTypes: true);
        services.AddTransient(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>));
        services.AddTransient(typeof(IPipelineBehavior<,>), typeof(UnitOfWorkBehavior<,>));

        return services;
    }
}
