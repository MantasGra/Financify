using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace server.Migrations
{
    public partial class FixturesUpdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Budgets",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "DateFrom", "DateTo" },
                values: new object[] { new DateTime(2020, 4, 30, 17, 34, 32, 163, DateTimeKind.Local).AddTicks(7519), new DateTime(2020, 5, 30, 17, 34, 32, 166, DateTimeKind.Local).AddTicks(9513) });

            migrationBuilder.UpdateData(
                table: "Budgets",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "DateFrom", "DateTo" },
                values: new object[] { new DateTime(2020, 4, 30, 17, 34, 32, 163, DateTimeKind.Local).AddTicks(7519), new DateTime(2020, 5, 30, 17, 34, 32, 167, DateTimeKind.Local).AddTicks(299) });

            migrationBuilder.UpdateData(
                table: "Budgets",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "DateFrom", "DateTo" },
                values: new object[] { new DateTime(2020, 4, 30, 17, 34, 32, 163, DateTimeKind.Local).AddTicks(7519), new DateTime(2020, 5, 30, 17, 34, 32, 167, DateTimeKind.Local).AddTicks(333) });

            migrationBuilder.UpdateData(
                table: "Budgets",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "DateFrom", "DateTo" },
                values: new object[] { new DateTime(2020, 4, 30, 17, 34, 32, 163, DateTimeKind.Local).AddTicks(7519), new DateTime(2020, 5, 30, 17, 34, 32, 167, DateTimeKind.Local).AddTicks(337) });

            migrationBuilder.UpdateData(
                table: "Transactions",
                keyColumn: "Id",
                keyValue: 1,
                column: "Date",
                value: new DateTime(2020, 4, 30, 17, 34, 32, 163, DateTimeKind.Local).AddTicks(7519));

            migrationBuilder.UpdateData(
                table: "Transactions",
                keyColumn: "Id",
                keyValue: 2,
                column: "Date",
                value: new DateTime(2020, 4, 30, 17, 34, 32, 163, DateTimeKind.Local).AddTicks(7519));

            migrationBuilder.UpdateData(
                table: "Transactions",
                keyColumn: "Id",
                keyValue: 3,
                column: "Date",
                value: new DateTime(2020, 4, 30, 17, 34, 32, 163, DateTimeKind.Local).AddTicks(7519));

            migrationBuilder.UpdateData(
                table: "Transactions",
                keyColumn: "Id",
                keyValue: 4,
                column: "Date",
                value: new DateTime(2020, 4, 30, 17, 34, 32, 163, DateTimeKind.Local).AddTicks(7519));

            migrationBuilder.UpdateData(
                table: "Transactions",
                keyColumn: "Id",
                keyValue: 5,
                column: "Date",
                value: new DateTime(2020, 4, 30, 17, 34, 32, 163, DateTimeKind.Local).AddTicks(7519));

            migrationBuilder.UpdateData(
                table: "Transactions",
                keyColumn: "Id",
                keyValue: 6,
                column: "Date",
                value: new DateTime(2020, 4, 30, 17, 34, 32, 163, DateTimeKind.Local).AddTicks(7519));

            migrationBuilder.UpdateData(
                table: "Transactions",
                keyColumn: "Id",
                keyValue: 7,
                column: "Date",
                value: new DateTime(2020, 4, 30, 17, 34, 32, 163, DateTimeKind.Local).AddTicks(7519));

            migrationBuilder.UpdateData(
                table: "Transactions",
                keyColumn: "Id",
                keyValue: 8,
                column: "Date",
                value: new DateTime(2020, 4, 30, 17, 34, 32, 163, DateTimeKind.Local).AddTicks(7519));

            migrationBuilder.UpdateData(
                table: "Transactions",
                keyColumn: "Id",
                keyValue: 9,
                column: "Date",
                value: new DateTime(2020, 4, 30, 17, 34, 32, 163, DateTimeKind.Local).AddTicks(7519));

            migrationBuilder.UpdateData(
                table: "Transactions",
                keyColumn: "Id",
                keyValue: 10,
                column: "Date",
                value: new DateTime(2020, 4, 30, 17, 34, 32, 163, DateTimeKind.Local).AddTicks(7519));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Budgets",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "DateFrom", "DateTo" },
                values: new object[] { new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified) });

            migrationBuilder.UpdateData(
                table: "Budgets",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "DateFrom", "DateTo" },
                values: new object[] { new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified) });

            migrationBuilder.UpdateData(
                table: "Budgets",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "DateFrom", "DateTo" },
                values: new object[] { new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified) });

            migrationBuilder.UpdateData(
                table: "Budgets",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "DateFrom", "DateTo" },
                values: new object[] { new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified) });

            migrationBuilder.UpdateData(
                table: "Transactions",
                keyColumn: "Id",
                keyValue: 1,
                column: "Date",
                value: new DateTime(2020, 4, 30, 15, 6, 50, 179, DateTimeKind.Local).AddTicks(1144));

            migrationBuilder.UpdateData(
                table: "Transactions",
                keyColumn: "Id",
                keyValue: 2,
                column: "Date",
                value: new DateTime(2020, 4, 30, 15, 6, 50, 179, DateTimeKind.Local).AddTicks(1144));

            migrationBuilder.UpdateData(
                table: "Transactions",
                keyColumn: "Id",
                keyValue: 3,
                column: "Date",
                value: new DateTime(2020, 4, 30, 15, 6, 50, 179, DateTimeKind.Local).AddTicks(1144));

            migrationBuilder.UpdateData(
                table: "Transactions",
                keyColumn: "Id",
                keyValue: 4,
                column: "Date",
                value: new DateTime(2020, 4, 30, 15, 6, 50, 179, DateTimeKind.Local).AddTicks(1144));

            migrationBuilder.UpdateData(
                table: "Transactions",
                keyColumn: "Id",
                keyValue: 5,
                column: "Date",
                value: new DateTime(2020, 4, 30, 15, 6, 50, 179, DateTimeKind.Local).AddTicks(1144));

            migrationBuilder.UpdateData(
                table: "Transactions",
                keyColumn: "Id",
                keyValue: 6,
                column: "Date",
                value: new DateTime(2020, 4, 30, 15, 6, 50, 179, DateTimeKind.Local).AddTicks(1144));

            migrationBuilder.UpdateData(
                table: "Transactions",
                keyColumn: "Id",
                keyValue: 7,
                column: "Date",
                value: new DateTime(2020, 4, 30, 15, 6, 50, 179, DateTimeKind.Local).AddTicks(1144));

            migrationBuilder.UpdateData(
                table: "Transactions",
                keyColumn: "Id",
                keyValue: 8,
                column: "Date",
                value: new DateTime(2020, 4, 30, 15, 6, 50, 179, DateTimeKind.Local).AddTicks(1144));

            migrationBuilder.UpdateData(
                table: "Transactions",
                keyColumn: "Id",
                keyValue: 9,
                column: "Date",
                value: new DateTime(2020, 4, 30, 15, 6, 50, 179, DateTimeKind.Local).AddTicks(1144));

            migrationBuilder.UpdateData(
                table: "Transactions",
                keyColumn: "Id",
                keyValue: 10,
                column: "Date",
                value: new DateTime(2020, 4, 30, 15, 6, 50, 179, DateTimeKind.Local).AddTicks(1144));
        }
    }
}
