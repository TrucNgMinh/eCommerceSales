using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace iNet.Entities
{
    [Table("productgroup")]
    public class ProductGroup: BaseEntity
  {
        public string Name { get; set; }
        public string Unit { get; set; }
        public int OrderNumber { get; set; }
  }
}
