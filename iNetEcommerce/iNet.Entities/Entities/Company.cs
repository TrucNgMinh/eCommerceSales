using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace iNet.Entities
{
    [Table("company")]
    public class Company: BaseEntity
  {
        public string CompanyName { get; set; }
        public string Logo { get; set; }
        public string PhoneNumber { get; set; }
        public string SubPhoneNumber { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
  }
}
