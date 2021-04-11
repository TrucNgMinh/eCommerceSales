using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace iNet.Entities
{
	  public abstract class BaseEntity : Entity
	  {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public DateTime DateTime { get; set; }
	  }

    internal class SaleEntityEfConfig : IEntityTypeConfiguration<BaseEntity>
    {
        public void Configure(EntityTypeBuilder<BaseEntity> builder)
        {
            builder.HasKey(p => p.Id);
            //builder.HasIndex(p => p.ApplicationId);
        }
    }
}

