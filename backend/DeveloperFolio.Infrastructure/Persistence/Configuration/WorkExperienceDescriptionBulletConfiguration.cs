using DeveloperFolio.Domain.WorkExperience;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DeveloperFolio.Infrastructure.Persistence.Configuration;

internal sealed class WorkExperienceDescriptionBulletConfiguration
    : EntityConfiguration<WorkExperienceDescriptionBullet>
{
    public override void Configure(EntityTypeBuilder<WorkExperienceDescriptionBullet> builder)
    {
        base.Configure(builder);

        builder.ToTable("WorkExperienceDescriptionBullets");
        builder.Property(bullet => bullet.Text).HasMaxLength(300).IsRequired();
        builder.Property(bullet => bullet.SortOrder).IsRequired();
        builder.HasIndex(bullet => new { bullet.WorkExperienceEntryId, bullet.SortOrder });
    }
}
