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
          public string Price { get; set; }
          public string SellPrice { get; set; }
          public string Content { get; set; }
    }
}
