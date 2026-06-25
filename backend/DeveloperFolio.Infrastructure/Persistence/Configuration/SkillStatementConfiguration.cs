using DeveloperFolio.Domain.Skills;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DeveloperFolio.Infrastructure.Persistence.Configuration;

internal sealed class SkillStatementConfiguration : EntityConfiguration<SkillStatement>
{
    public override void Configure(EntityTypeBuilder<SkillStatement> builder)
    {
        base.Configure(builder);

        builder.ToTable("SkillStatements");
        builder.Property(statement => statement.Text).HasMaxLength(500).IsRequired();
        builder.Property(statement => statement.SortOrder).IsRequired();
        builder.Property(statement => statement.IsPublished).IsRequired();

        builder.HasIndex(statement => new { statement.IsPublished, statement.SortOrder });
    }
}
