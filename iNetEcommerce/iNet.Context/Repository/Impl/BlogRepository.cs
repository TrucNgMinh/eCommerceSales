using iNet.Entities;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace iNet.Context
{
    public class BlogRepository : Repository<BlogPost>, IBlogRepository
    {
        public List<BlogPost> GetListBlog(int skip, int take, bool includeDeactivate = false)
        {
            using (var context = new INetEcommerceContext())
            {
                return context.Set<BlogPost>().Where(p=> p.IsDeactivate == includeDeactivate && !p.IsDeleted)
                                                .Include(s => s.User)
                                                .ToList();
            }
        }

    }
}
