using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace iNet.Entities
{
    [Table("product")]
    public class Product : BaseEntity
    {
          public string Name { get; set; }
          public string Unit { get; set; }
          public decimal Price { get; set; }
          public decimal SellPrice { get; set; }
          public decimal SellPriceMax { get; set; }
          public string Content { get; set; }
          public string Abstract { get; set; }
    }
}
