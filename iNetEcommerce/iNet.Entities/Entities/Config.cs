using System.ComponentModel.DataAnnotations.Schema;

namespace iNet.Entities
{
    [Table("config")]
    public class Config : BaseEntity
    {
          public string PrimaryColor { get; set; }
          public string Banner1 { get; set; }
          public string Banner2 { get; set; }
          public string Banner3 { get; set; }
          public string Banner4 { get; set; }
    }
}
