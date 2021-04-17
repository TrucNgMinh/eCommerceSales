using System;
using Microsoft.EntityFrameworkCore.Migrations;
using MySql.EntityFrameworkCore.Metadata;

namespace iNet.Context.Migrations
{
    public partial class init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "company",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    CompanyName = table.Column<string>(type: "text", nullable: true),
                    Logo = table.Column<string>(type: "text", nullable: true),
                    PhoneNumber = table.Column<string>(type: "text", nullable: true),
                    SubPhoneNumber = table.Column<string>(type: "text", nullable: true),
                    Address = table.Column<string>(type: "text", nullable: true),
                    Email = table.Column<string>(type: "text", nullable: true),
                    IsDeactivate = table.Column<bool>(type: "tinyint(1)", nullable: true),
                    IsDeleted = table.Column<bool>(type: "tinyint(1)", nullable: true),
                    DateTimeProcessed = table.Column<DateTimeOffset>(type: "timestamp", nullable: true),
                    DateTime = table.Column<DateTime>(type: "datetime", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_company", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "config",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    PrimaryColor = table.Column<string>(type: "text", nullable: true),
                    Banner1 = table.Column<string>(type: "text", nullable: true),
                    Banner2 = table.Column<string>(type: "text", nullable: true),
                    Banner3 = table.Column<string>(type: "text", nullable: true),
                    Banner4 = table.Column<string>(type: "text", nullable: true),
                    IsDeactivate = table.Column<bool>(type: "tinyint(1)", nullable: true),
                    IsDeleted = table.Column<bool>(type: "tinyint(1)", nullable: true),
                    DateTimeProcessed = table.Column<DateTimeOffset>(type: "timestamp", nullable: true),
                    DateTime = table.Column<DateTime>(type: "datetime", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_config", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "product",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(type: "text", nullable: true),
                    Price = table.Column<string>(type: "text", nullable: true),
                    SellPrice = table.Column<string>(type: "text", nullable: true),
                    Content = table.Column<string>(type: "text", nullable: true),
                    IsDeactivate = table.Column<bool>(type: "tinyint(1)", nullable: true),
                    IsDeleted = table.Column<bool>(type: "tinyint(1)", nullable: true),
                    DateTimeProcessed = table.Column<DateTimeOffset>(type: "timestamp", nullable: true),
                    DateTime = table.Column<DateTime>(type: "datetime", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_product", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "productgroup",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(type: "text", nullable: true),
                    Unit = table.Column<string>(type: "text", nullable: true),
                    OrderNumber = table.Column<int>(type: "int", nullable: false),
                    IsDeactivate = table.Column<bool>(type: "tinyint(1)", nullable: true),
                    IsDeleted = table.Column<bool>(type: "tinyint(1)", nullable: true),
                    DateTimeProcessed = table.Column<DateTimeOffset>(type: "timestamp", nullable: true),
                    DateTime = table.Column<DateTime>(type: "datetime", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_productgroup", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "productimage",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    ProductId = table.Column<int>(type: "int", nullable: false),
                    Image = table.Column<string>(type: "text", nullable: true),
                    IsDeactivate = table.Column<bool>(type: "tinyint(1)", nullable: true),
                    IsDeleted = table.Column<bool>(type: "tinyint(1)", nullable: true),
                    DateTimeProcessed = table.Column<DateTimeOffset>(type: "timestamp", nullable: true),
                    DateTime = table.Column<DateTime>(type: "datetime", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_productimage", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "user",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    FullName = table.Column<string>(type: "text", nullable: true),
                    UserName = table.Column<string>(type: "text", nullable: true),
                    Hash = table.Column<string>(type: "text", nullable: true),
                    Passcode = table.Column<string>(type: "text", nullable: true),
                    Phone = table.Column<string>(type: "text", nullable: true),
                    SubPhone = table.Column<string>(type: "text", nullable: true),
                    Address = table.Column<string>(type: "text", nullable: true),
                    Email = table.Column<string>(type: "text", nullable: true),
                    Image = table.Column<string>(type: "text", nullable: true),
                    IsDeactivate = table.Column<bool>(type: "tinyint(1)", nullable: true),
                    IsDeleted = table.Column<bool>(type: "tinyint(1)", nullable: true),
                    DateTimeProcessed = table.Column<DateTimeOffset>(type: "timestamp", nullable: true),
                    DateTime = table.Column<DateTime>(type: "datetime", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_user", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_productimage_ProductId",
                table: "productimage",
                column: "ProductId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "company");

            migrationBuilder.DropTable(
                name: "config");

            migrationBuilder.DropTable(
                name: "product");

            migrationBuilder.DropTable(
                name: "productgroup");

            migrationBuilder.DropTable(
                name: "productimage");

            migrationBuilder.DropTable(
                name: "user");
        }
    }
}
