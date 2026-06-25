using DeveloperFolio.Domain.Settings;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DeveloperFolio.Infrastructure.Persistence.Configuration;

internal sealed class SocialLinkConfiguration : EntityConfiguration<SocialLink>
{
    public override void Configure(EntityTypeBuilder<SocialLink> builder)
    {
        base.Configure(builder);

        builder.ToTable("SocialLinks");
        builder.Property(link => link.Name).HasMaxLength(80).IsRequired();
        builder.Property(link => link.Url).HasMaxLength(2048).IsRequired();
        builder.Property(link => link.IconClassName).HasMaxLength(160).IsRequired();
        builder.Property(link => link.SortOrder).IsRequired();
        builder.Property(link => link.IsPublished).IsRequired();

        builder.HasIndex(link => new { link.IsPublished, link.SortOrder });
    }
}
