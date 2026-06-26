using Autofac;
using GSocobat.Infrastructure;
using GSocobat.Infrastructure.Repositories;

namespace GSecobat.Infrastructure;

public class InfrastructureModule : Module
{
    protected override void Load(ContainerBuilder builder)
    {
        var assembly = typeof(EmployeeRepository).Assembly;

        // 🔹 Repositories
        builder.RegisterAssemblyTypes(assembly)
            .Where(t => t.Name.EndsWith("Repository"))
            .AsImplementedInterfaces()
            .InstancePerLifetimeScope();

        // 🔹 DbContext
        builder.RegisterType<GSecobatAppDbContext>()
            .AsSelf()
            .InstancePerLifetimeScope();
    }
}
