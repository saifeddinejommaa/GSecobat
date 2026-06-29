# Build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /app

COPY . .

RUN dotnet restore GSecobat-Api.sln

RUN dotnet publish GSecobat.Api/GSecobat.Api.csproj -c Release -o /publish

# Runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final

WORKDIR /app

COPY --from=build /publish .

EXPOSE 8080

ENTRYPOINT ["dotnet","GSecobat.Api.dll"]