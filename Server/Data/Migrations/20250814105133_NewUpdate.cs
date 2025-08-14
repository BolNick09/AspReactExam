using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Data.Migrations
{
    /// <inheritdoc />
    public partial class NewUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserId",
                table: "GameResults");

            migrationBuilder.AddColumn<int>(
                name: "Clicks",
                table: "GameResults",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "TimeInSeconds",
                table: "GameResults",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Clicks",
                table: "GameResults");

            migrationBuilder.DropColumn(
                name: "TimeInSeconds",
                table: "GameResults");

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "GameResults",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
