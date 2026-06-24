using DeveloperFolio.Application.Abstractions;
using Microsoft.AspNetCore.Http;

namespace DeveloperFolio.Application.Features.Projects.Common;

internal static class FormFileExtensions
{
    public static ImageUpload? ToImageUpload(this IFormFile? file)
    {
        if (file is null || file.Length == 0)
        {
            return null;
        }

        return new ImageUpload(
            file.OpenReadStream(),
            file.FileName,
            file.ContentType,
            file.Length);
    }

    public static string? GetString(this IFormCollection form, string key)
    {
        var value = form[key].ToString();
        return string.IsNullOrWhiteSpace(value) ? null : value;
    }

    public static bool GetBool(this IFormCollection form, string key)
    {
        var value = form[key].ToString();
        return bool.TryParse(value, out var parsed) && parsed;
    }

    public static string[] GetStrings(this IFormCollection form, string key) =>
        form[key]
            .Where(value => !string.IsNullOrWhiteSpace(value))
            .Select(value => value!)
            .ToArray();
}
