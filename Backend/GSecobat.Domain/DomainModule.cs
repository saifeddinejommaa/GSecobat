using Microsoft.Extensions.DependencyInjection;

public static class DomainModule
{
    public static IServiceCollection ConfigureDomainServices(this IServiceCollection services)
                          => services;
}