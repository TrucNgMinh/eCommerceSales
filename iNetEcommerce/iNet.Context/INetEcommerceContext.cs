
using iNet.Common;
using iNet.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using static iNet.Common.UtilEnum;

namespace iNet.Context
{
    public class INetEcommerceContext : DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseMySQL(DataConstants.IdentitySettings.INetEcommerceDatabase, null);
        }

        #region DbSets
        public DbSet<ProductGroup> ProductGroup { get; set; }
        public DbSet<Product> Product { get; set; }
        public DbSet<User> ProductInformation { get; set; }
        public DbSet<ProductImage> ProductImage { get; set; }
        public DbSet<Config> ProductOverlayDescription { get; set; }
        public DbSet<BlogPost> BlogPost { get; set; }
        public DbSet<Company> Company { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ProductImage>().HasIndex(p => p.ProductId);

            #region user
            var hash = new Guid().ToString();
            modelBuilder.Entity<User>().HasData(new User { Id = 1, UserName = "haonguyen", Email = "nhenden1511@gmail.com", FullName = "Hao nguyen", Hash = hash, Passcode = UtilCommon.GeneratePasscode("123456x@X", hash), UserRole = UserRole.Administrator, Phone = "0132666666", IsDeactivate = false });
            #endregion
        }
        #endregion

    }
}
