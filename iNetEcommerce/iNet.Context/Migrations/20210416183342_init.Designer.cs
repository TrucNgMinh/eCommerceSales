﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using iNet.Context;

namespace iNet.Context.Migrations
{
    [DbContext(typeof(INetEcommerceContext))]
    [Migration("20210416183342_init")]
    partial class init
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 64)
                .HasAnnotation("ProductVersion", "5.0.4");

            modelBuilder.Entity("iNet.Entities.Company", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Address")
                        .HasColumnType("text");

                    b.Property<string>("CompanyName")
                        .HasColumnType("text");

                    b.Property<DateTime>("DateTime")
                        .HasColumnType("datetime");

                    b.Property<DateTimeOffset?>("DateTimeProcessed")
                        .HasColumnType("timestamp");

                    b.Property<string>("Email")
                        .HasColumnType("text");

                    b.Property<bool?>("IsDeactivate")
                        .HasColumnType("tinyint(1)");

                    b.Property<bool?>("IsDeleted")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("Logo")
                        .HasColumnType("text");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("text");

                    b.Property<string>("SubPhoneNumber")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("company");
                });

            modelBuilder.Entity("iNet.Entities.Config", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Banner1")
                        .HasColumnType("text");

                    b.Property<string>("Banner2")
                        .HasColumnType("text");

                    b.Property<string>("Banner3")
                        .HasColumnType("text");

                    b.Property<string>("Banner4")
                        .HasColumnType("text");

                    b.Property<DateTime>("DateTime")
                        .HasColumnType("datetime");

                    b.Property<DateTimeOffset?>("DateTimeProcessed")
                        .HasColumnType("timestamp");

                    b.Property<bool?>("IsDeactivate")
                        .HasColumnType("tinyint(1)");

                    b.Property<bool?>("IsDeleted")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("PrimaryColor")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("config");
                });

            modelBuilder.Entity("iNet.Entities.Product", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Content")
                        .HasColumnType("text");

                    b.Property<DateTime>("DateTime")
                        .HasColumnType("datetime");

                    b.Property<DateTimeOffset?>("DateTimeProcessed")
                        .HasColumnType("timestamp");

                    b.Property<bool?>("IsDeactivate")
                        .HasColumnType("tinyint(1)");

                    b.Property<bool?>("IsDeleted")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<string>("Price")
                        .HasColumnType("text");

                    b.Property<string>("SellPrice")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("product");
                });

            modelBuilder.Entity("iNet.Entities.ProductGroup", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<DateTime>("DateTime")
                        .HasColumnType("datetime");

                    b.Property<DateTimeOffset?>("DateTimeProcessed")
                        .HasColumnType("timestamp");

                    b.Property<bool?>("IsDeactivate")
                        .HasColumnType("tinyint(1)");

                    b.Property<bool?>("IsDeleted")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<int>("OrderNumber")
                        .HasColumnType("int");

                    b.Property<string>("Unit")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("productgroup");
                });

            modelBuilder.Entity("iNet.Entities.ProductImage", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<DateTime>("DateTime")
                        .HasColumnType("datetime");

                    b.Property<DateTimeOffset?>("DateTimeProcessed")
                        .HasColumnType("timestamp");

                    b.Property<string>("Image")
                        .HasColumnType("text");

                    b.Property<bool?>("IsDeactivate")
                        .HasColumnType("tinyint(1)");

                    b.Property<bool?>("IsDeleted")
                        .HasColumnType("tinyint(1)");

                    b.Property<int>("ProductId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("ProductId");

                    b.ToTable("productimage");
                });

            modelBuilder.Entity("iNet.Entities.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Address")
                        .HasColumnType("text");

                    b.Property<DateTime>("DateTime")
                        .HasColumnType("datetime");

                    b.Property<DateTimeOffset?>("DateTimeProcessed")
                        .HasColumnType("timestamp");

                    b.Property<string>("Email")
                        .HasColumnType("text");

                    b.Property<string>("FullName")
                        .HasColumnType("text");

                    b.Property<string>("Hash")
                        .HasColumnType("text");

                    b.Property<string>("Image")
                        .HasColumnType("text");

                    b.Property<bool?>("IsDeactivate")
                        .HasColumnType("tinyint(1)");

                    b.Property<bool?>("IsDeleted")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("Passcode")
                        .HasColumnType("text");

                    b.Property<string>("Phone")
                        .HasColumnType("text");

                    b.Property<string>("SubPhone")
                        .HasColumnType("text");

                    b.Property<string>("UserName")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("user");
                });
#pragma warning restore 612, 618
        }
    }
}
