using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace server.Migrations
{
    public partial class Fixtures : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Discriminator", "Email", "Fullname", "Password", "RegistrationDate" },
                values: new object[] { 1, "User", "admin@financify.net", "Admin Financify", "123456789", DateTime.UtcNow });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Discriminator", "Email", "Fullname", "Password", "RegistrationDate" },
                values: new object[] { 2, "User", "StephanieTMacha@armyspy.com", "Stephanie T. Macha", "123456789", DateTime.UtcNow});

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Discriminator", "Email", "Fullname", "Password", "RegistrationDate" },
                values: new object[] { 3, "User", "DavidDReed@rhyta.com", "David D. Reed", "123456789", DateTime.UtcNow });

            migrationBuilder.InsertData(
                table: "Accounts",
                columns: new[] { "Id", "Name", "Type", "UserId" },
                values: new object[,]
                {
                    { 1, "Cash", 0, 1 },
                    { 2, "Main", 1, 1 },
                    { 3, "Cash", 0, 2 },
                    { 4, "Default", 0, 3 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Users_Email",
                table: "Users",
                column: "Email",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Users_Email",
                table: "Users");

            migrationBuilder.DeleteData(
                table: "Accounts",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Accounts",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Accounts",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Accounts",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 3);
        }
    }
}
