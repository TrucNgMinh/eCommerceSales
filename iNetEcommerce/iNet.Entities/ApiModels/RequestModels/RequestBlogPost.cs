using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace iNet.Entities
{
    public class RequestBlogPost
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Body { get; set; }
        public string Abstract { get; set; }
    }
}
