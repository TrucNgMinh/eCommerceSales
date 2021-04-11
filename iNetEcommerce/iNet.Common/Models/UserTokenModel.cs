using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace iNet.Common
{
    public class UserTokenModel
    {
        public int UserId { get; set; }

        public string UserName { get; set; }

        public long Hash { get; set; }
    }
}
