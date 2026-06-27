# Build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# 1. Copy solution and all projects FIRST
COPY . .

# 2. Restore solution
RUN dotnet restore "GSecobat-API.sln"

# 3. Publish API project
RUN dotnet publish "GSecobat.Api/GSecobat.Api.csproj" -c Release -o /app/publish

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app

COPY --from=build /app/publish .

EXPOSE 5006
ENTRYPOINT ["dotnet", "GSecobat.Api.dll"]