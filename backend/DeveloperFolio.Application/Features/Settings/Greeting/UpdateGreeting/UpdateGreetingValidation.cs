using FluentValidation;

namespace DeveloperFolio.Application.Features.Settings.Greeting.UpdateGreeting;

internal sealed class UpdateGreetingValidation : AbstractValidator<UpdateGreetingCommand>
{
    public UpdateGreetingValidation()
    {
        RuleFor(command => command.Username).NotEmpty().MaximumLength(120);
        RuleFor(command => command.Title).NotEmpty().MaximumLength(200);
        RuleFor(command => command.SubTitle).NotEmpty().MaximumLength(2000);
        RuleFor(command => command.ResumeUrl).MaximumLength(2048);
        RuleFor(command => command.IntroVideoUrl).MaximumLength(2048);
    }
}
