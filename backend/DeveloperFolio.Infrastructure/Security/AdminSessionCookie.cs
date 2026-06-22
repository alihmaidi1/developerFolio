using DeveloperFolio.Application.Abstractions;
using DeveloperFolio.Infrastructure.Options;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;

namespace DeveloperFolio.Infrastructure.Security;

internal sealed class AdminSessionCookie(
    IHttpContextAccessor httpContextAccessor,
    IHostEnvironment environment,
    IOptions<AuthCookieOptions> cookieOptions,
    IOptions<JwtOptions> jwtOptions) : IAdminSessionCookie
{
    private readonly AuthCookieOptions _cookieOptions = cookieOptions.Value;
    private readonly JwtOptions _jwtOptions = jwtOptions.Value;

    public void Set(string accessToken)
    {
        var context = GetHttpContext();
        context.Response.Cookies.Append(
            _cookieOptions.Name,
            accessToken,
            CreateOptions(context, DateTimeOffset.UtcNow.AddMinutes(_jwtOptions.ExpirationMinutes)));
    }

    public void Clear()
    {
        var context = GetHttpContext();
        context.Response.Cookies.Delete(_cookieOptions.Name, CreateOptions(context, null));
    }

    private CookieOptions CreateOptions(HttpContext context, DateTimeOffset? expires) =>
        new()
        {
            HttpOnly = true,
            Secure = !environment.IsDevelopment() || context.Request.IsHttps,
            SameSite = SameSiteMode.Strict,
            Path = "/",
            Expires = expires,
            IsEssential = true,
        };

    private HttpContext GetHttpContext() =>
        httpContextAccessor.HttpContext
        ?? throw new InvalidOperationException("An active HTTP request is required.");
}
