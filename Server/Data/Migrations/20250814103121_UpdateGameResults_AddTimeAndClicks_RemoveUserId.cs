using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Data.Migrations
{
    public partial class UpdateGameResults_AddTimeAndClicks_RemoveUserId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Удаляем колонку UserId
            migrationBuilder.DropColumn(
                name: "UserId",
                table: "GameResults");

            // Добавляем TimeInSeconds и Clicks
            migrationBuilder.AddColumn<int>(
                name: "TimeInSeconds",
                table: "GameResults",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Clicks",
                table: "GameResults",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Откат: вернуть UserId и убрать новые поля
            migrationBuilder.DropColumn(
                name: "TimeInSeconds",
                table: "GameResults");

            migrationBuilder.DropColumn(
                name: "Clicks",
                table: "GameResults");

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "GameResults",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}