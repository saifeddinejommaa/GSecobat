using Autofac;
using Autofac.Extensions.DependencyInjection;
using GSecobat.Api.Middleware;
using GSecobat.Application;
using GSecobat.Application.Common;
using GSecobat.Infrastructure;
using GSocobat.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Npgsql;
using System.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

//Dependency Injection
builder.Host.UseServiceProviderFactory(new AutofacServiceProviderFactory());

builder.Host.ConfigureContainer<ContainerBuilder>(container =>
{
    container.RegisterModule(new ApplicationModule());
    container.RegisterModule(new InfrastructureModule());
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//Present Urls in lowerCase
builder.Services.Configure<RouteOptions>(options =>
{
    options.LowercaseUrls = true;
});

builder.Services.AddDbContext<GSecobatAppDbContext>(options =>
    options.UseNpgsql(
        builder.Configuration.GetConnectionString("DefaultConnection")
    )
);

builder.Services.AddScoped<IDbConnection>(sp =>
    new NpgsqlConnection(
        builder.Configuration.GetConnectionString("DefaultConnection")
    )
);

//MediatR
builder.Services.AddMediatR(cfg =>
    cfg.RegisterServicesFromAssembly(typeof(Program).Assembly));

builder.Services.AddTransient(
    typeof(IPipelineBehavior<,>),
    typeof(RequestPipelineBehavior<,>));

// Log config
builder.Logging.AddConsole();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Response Middleware
app.UseMiddleware<ApiResponseMiddleware>();

// Exception Middlware
app.UseMiddleware<ExceptionHandlerMiddlware>();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
