using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace iNet.Entities
{
    [Table("productimage")]
    public class ProductImage : BaseEntity
    {
        public ProductImage(int productId, string image)
        {
            ProductId = productId;
            Image = image;
        }
        public int ProductId { get; set; }

        [ForeignKey("ProductId")]
        public Product Product { get; set; }
        public string Image { get; set; }
    }
}
