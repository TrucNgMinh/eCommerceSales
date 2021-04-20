using iNet.Entities;
using System;
using System.Collections.Generic;

namespace iNet.Context
{
    public interface IBlogRepository : IRepository<BlogPost>
    {
        List<BlogPost> GetListBlog(int skip, int take, bool includeDeactivate = false);
    }
}
