using Autofac;
using AutoMapper;
using MediatR;
using Microsoft.Extensions.Logging.Abstractions;
using System.Reflection;

namespace GSecobat.Application
{
    public class ApplicationModule : Autofac.Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            var assembly = Assembly.GetExecutingAssembly();

            // 🔹 Services (convention)
            builder.RegisterAssemblyTypes(assembly)
                .Where(t => t.Name.EndsWith("Service"))
                .AsImplementedInterfaces()
                .InstancePerLifetimeScope();

            // 🔹 MediatR handlers
            builder.RegisterAssemblyTypes(assembly)
                .AsClosedTypesOf(typeof(IRequestHandler<>))
                .AsImplementedInterfaces();

            builder.RegisterAssemblyTypes(assembly)
                .AsClosedTypesOf(typeof(IRequestHandler<,>))
                .AsImplementedInterfaces();

            // 🔹 AutoMapper
            builder.Register(ctx =>
            {
                var assembly = Assembly.GetExecutingAssembly();

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.AddMaps(assembly);
                }, loggerFactory: new NullLoggerFactory());

                config.AssertConfigurationIsValid();

                return config.CreateMapper();
            })
            .As<IMapper>()
            .InstancePerLifetimeScope();
        }
    }
}
