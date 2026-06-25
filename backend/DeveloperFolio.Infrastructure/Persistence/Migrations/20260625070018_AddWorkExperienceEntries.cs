using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DeveloperFolio.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddWorkExperienceEntries : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "WorkExperienceEntries",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Role = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    Company = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    Date = table.Column<string>(type: "character varying(120)", maxLength: 120, nullable: false),
                    Description = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    CompanyLogoUrl = table.Column<string>(type: "character varying(2048)", maxLength: 2048, nullable: true),
                    SortOrder = table.Column<int>(type: "integer", nullable: false),
                    IsPublished = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAtUtc = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    UpdatedAtUtc = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkExperienceEntries", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "WorkExperienceDescriptionBullets",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    WorkExperienceEntryId = table.Column<Guid>(type: "uuid", nullable: false),
                    Text = table.Column<string>(type: "character varying(300)", maxLength: 300, nullable: false),
                    SortOrder = table.Column<int>(type: "integer", nullable: false),
                    CreatedAtUtc = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    UpdatedAtUtc = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkExperienceDescriptionBullets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WorkExperienceDescriptionBullets_WorkExperienceEntries_Work~",
                        column: x => x.WorkExperienceEntryId,
                        principalTable: "WorkExperienceEntries",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_WorkExperienceDescriptionBullets_WorkExperienceEntryId_Sort~",
                table: "WorkExperienceDescriptionBullets",
                columns: new[] { "WorkExperienceEntryId", "SortOrder" });

            migrationBuilder.CreateIndex(
                name: "IX_WorkExperienceEntries_IsPublished_SortOrder",
                table: "WorkExperienceEntries",
                columns: new[] { "IsPublished", "SortOrder" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "WorkExperienceDescriptionBullets");

            migrationBuilder.DropTable(
                name: "WorkExperienceEntries");
        }
    }
}
