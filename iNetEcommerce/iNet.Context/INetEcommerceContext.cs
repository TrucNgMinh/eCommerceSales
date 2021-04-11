
using iNet.Common;
using iNet.Entities;
using Microsoft.EntityFrameworkCore;

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
        public DbSet<Company> Company { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ProductImage>().HasIndex(p => p.ProductId);
            
        }
        #endregion
    }
}
