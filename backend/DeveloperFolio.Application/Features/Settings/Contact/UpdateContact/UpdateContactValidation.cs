using FluentValidation;

namespace DeveloperFolio.Application.Features.Settings.Contact.UpdateContact;

internal sealed class UpdateContactValidation : AbstractValidator<UpdateContactCommand>
{
    public UpdateContactValidation()
    {
        RuleFor(command => command.Title).NotEmpty().MaximumLength(200);
        RuleFor(command => command.Subtitle).NotEmpty().MaximumLength(1000);
        RuleFor(command => command.Email)
            .MaximumLength(200)
            .EmailAddress()
            .When(command => !string.IsNullOrWhiteSpace(command.Email));
        RuleFor(command => command.Phone).MaximumLength(80);
        RuleFor(command => command.Address).MaximumLength(300);
    }
}
