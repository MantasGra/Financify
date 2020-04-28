using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace server.Migrations
{
    public partial class TransactionFixtures : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Transactions",
                columns: new[] { "Id", "AccountId", "Amount", "Category", "Date", "Description", "Disabled" },
                values: new object[,]
                {
                    { 1, 1, 125.31, 6, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Some description", false },
                    { 2, 1, 13.99, 8, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, false },
                    { 3, 1, 4.6500000000000004, 0, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "McDonalds", true },
                    { 4, 3, 87.439999999999998, 7, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, false }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Transactions",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Transactions",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Transactions",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Transactions",
                keyColumn: "Id",
                keyValue: 4);
        }
    }
}
