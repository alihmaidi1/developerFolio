# syntax=docker/dockerfile:1

FROM mcr.microsoft.com/dotnet/sdk:9.0-alpine AS build
WORKDIR /src

COPY DeveloperFolio.sln ./
COPY DeveloperFolio.Api/DeveloperFolio.Api.csproj DeveloperFolio.Api/
COPY DeveloperFolio.Application/DeveloperFolio.Application.csproj DeveloperFolio.Application/
COPY DeveloperFolio.Domain/DeveloperFolio.Domain.csproj DeveloperFolio.Domain/
COPY DeveloperFolio.Infrastructure/DeveloperFolio.Infrastructure.csproj DeveloperFolio.Infrastructure/
COPY DeveloperFolio.Tests/DeveloperFolio.Tests.csproj DeveloperFolio.Tests/

RUN dotnet restore DeveloperFolio.sln

COPY . .
RUN dotnet publish DeveloperFolio.Api/DeveloperFolio.Api.csproj \
    --configuration Release \
    --no-restore \
    --output /app/publish \
    /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:9.0-alpine AS runtime
WORKDIR /app

ENV ASPNETCORE_URLS=http://+:8080
ENV ASPNETCORE_ENVIRONMENT=Production

RUN mkdir -p /app/wwwroot && chown -R $APP_UID:0 /app
COPY --from=build --chown=$APP_UID:0 /app/publish .

USER $APP_UID
EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD wget -qO- http://localhost:8080/health || exit 1

ENTRYPOINT ["dotnet", "DeveloperFolio.Api.dll"]
