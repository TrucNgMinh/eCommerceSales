using System.ComponentModel.DataAnnotations.Schema;
using static iNet.Common.UtilEnum;

namespace iNet.Entities
{
    [Table("user")]
    public class User: BaseEntity
  {
        public string FullName { get; set; }
        public string UserName { get; set; }
        public string Hash { get; set; }
        public string Passcode { get; set; }
        public string Phone { get; set; }
        public string SubPhone { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
        public string Image { get; set; }
        public UserRole UserRole { get; set; }
    }
}
