using iNet.Common;
using iNet.Entities;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace iNet.Context.Services.Impl
{
    public interface IBlogService
    {
        Task<ApiResponseModel> GetListBlogs(RequestGetBlogPost model);
        Task<ApiResponseModel> AddEditBlog(RequestBlogPost model, UserTokenModel userToken, IFormFile image);
    }
}
