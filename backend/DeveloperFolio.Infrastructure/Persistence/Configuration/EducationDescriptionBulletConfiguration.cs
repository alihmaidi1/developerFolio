using DeveloperFolio.Domain.Education;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DeveloperFolio.Infrastructure.Persistence.Configuration;

internal sealed class EducationDescriptionBulletConfiguration
    : EntityConfiguration<EducationDescriptionBullet>
{
    public override void Configure(EntityTypeBuilder<EducationDescriptionBullet> builder)
    {
        base.Configure(builder);

        builder.ToTable("EducationDescriptionBullets");
        builder.Property(bullet => bullet.Text).HasMaxLength(300).IsRequired();
        builder.Property(bullet => bullet.SortOrder).IsRequired();
        builder.HasIndex(bullet => new { bullet.EducationEntryId, bullet.SortOrder });
    }
}
