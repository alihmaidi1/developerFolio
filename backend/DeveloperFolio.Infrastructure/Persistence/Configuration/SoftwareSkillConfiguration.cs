using DeveloperFolio.Domain.Skills;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DeveloperFolio.Infrastructure.Persistence.Configuration;

internal sealed class SoftwareSkillConfiguration : EntityConfiguration<SoftwareSkill>
{
    public override void Configure(EntityTypeBuilder<SoftwareSkill> builder)
    {
        base.Configure(builder);

        builder.ToTable("SoftwareSkills");
        builder.Property(skill => skill.Name).HasMaxLength(80).IsRequired();
        builder.Property(skill => skill.IconClassName).HasMaxLength(160).IsRequired();
        builder.Property(skill => skill.SortOrder).IsRequired();
        builder.Property(skill => skill.IsPublished).IsRequired();

        builder.HasIndex(skill => new { skill.IsPublished, skill.SortOrder });
    }
}
