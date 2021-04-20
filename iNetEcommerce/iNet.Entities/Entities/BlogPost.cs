using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace iNet.Entities
{
    [Table("blogpost")]
    public class BlogPost : BaseEntity
    {
		public int UserId { get; set; }
        [ForeignKey("UserId")]
        public User User { get; set; }
        public string Title { get; set; }
		public string Body { get; set; }
		public DateTime DateTimeCreate { get; set; }
	}
}
