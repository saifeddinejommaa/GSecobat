using System.Text.Json;
using GSecobat.Api.ApiResponse;

namespace GSecobat.Api.Middleware
{
    public class ApiResponseMiddleware
    {
        private readonly RequestDelegate _next;

        public ApiResponseMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            var originalBodyStream = context.Response.Body;

            using var memoryStream = new MemoryStream();
            context.Response.Body = memoryStream;

            await _next(context);

            memoryStream.Position = 0;
            var body = await new StreamReader(memoryStream).ReadToEndAsync();

            object? data = null;

            if (!string.IsNullOrWhiteSpace(body))
            {
                data = JsonSerializer.Deserialize<object>(body);
            }

            var wrappedResponse = new ApiResponse<object?>(
                context.Response.StatusCode,
                data,
                context.Response.StatusCode == 200 ? "Success" : "Error"
            );

            var json = JsonSerializer.Serialize(wrappedResponse);

            context.Response.Body = originalBodyStream;
            context.Response.ContentType = "application/json";
            await context.Response.WriteAsync(json);
        }
    }
}
