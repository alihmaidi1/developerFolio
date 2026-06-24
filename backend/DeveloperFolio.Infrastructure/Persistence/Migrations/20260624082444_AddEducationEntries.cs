using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DeveloperFolio.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddEducationEntries : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "EducationEntries",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    SchoolName = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    Degree = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    Duration = table.Column<string>(type: "character varying(120)", maxLength: 120, nullable: false),
                    Description = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    LogoUrl = table.Column<string>(type: "character varying(2048)", maxLength: 2048, nullable: true),
                    SortOrder = table.Column<int>(type: "integer", nullable: false),
                    IsPublished = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAtUtc = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    UpdatedAtUtc = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EducationEntries", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "EducationDescriptionBullets",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    EducationEntryId = table.Column<Guid>(type: "uuid", nullable: false),
                    Text = table.Column<string>(type: "character varying(300)", maxLength: 300, nullable: false),
                    SortOrder = table.Column<int>(type: "integer", nullable: false),
                    CreatedAtUtc = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    UpdatedAtUtc = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EducationDescriptionBullets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EducationDescriptionBullets_EducationEntries_EducationEntry~",
                        column: x => x.EducationEntryId,
                        principalTable: "EducationEntries",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_EducationDescriptionBullets_EducationEntryId_SortOrder",
                table: "EducationDescriptionBullets",
                columns: new[] { "EducationEntryId", "SortOrder" });

            migrationBuilder.CreateIndex(
                name: "IX_EducationEntries_IsPublished_SortOrder",
                table: "EducationEntries",
                columns: new[] { "IsPublished", "SortOrder" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "EducationDescriptionBullets");

            migrationBuilder.DropTable(
                name: "EducationEntries");
        }
    }
}
