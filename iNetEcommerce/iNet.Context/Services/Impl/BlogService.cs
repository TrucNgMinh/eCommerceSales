using iNet.Common;
using iNet.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace iNet.Context.Services.Impl
{
    public class BlogService : IBlogService
    {
        private IBlogRepository _blogRepository;
        private IRepository<User> _userRepository;

        public BlogService()
        {
            _blogRepository = new BlogRepository();
            _userRepository = new Repository<User>();
        }

        public async Task<ApiResponseModel> GetListBlogs(RequestGetBlogPost model)
        {
            var response = new ApiResponseModel();

            var results = _blogRepository.GetListBlog(model.Skip, model.Take, model.IncludeDeactivate);

            response.Data = results.ToListModel();
            response.HttpStatusCode = System.Net.HttpStatusCode.OK;
            return response;
        }

        public async Task<ApiResponseModel> DeleteBlog(ApiProductGroup model)
        {
            var response = new ApiResponseModel();

            await _blogRepository.DeleteAsync(model.Id);

            response.HttpStatusCode = System.Net.HttpStatusCode.OK;
            return response;
        }

        public async Task<ApiResponseModel> AddEditBlog(RequestBlogPost model, UserTokenModel userToken)
        {
            var response = new ApiResponseModel();
            ApiBlogPost result = null;
            var user = await _userRepository.GetByIdAsync(userToken.UserId);

            if (model.Id != 0)
            {
                var blog = await _blogRepository.GetByIdAsync(model.Id);
                if (blog == null)
                {
                    response.Error = ErrorMessageCode.BLOG_NOT_FOUND;
                    response.HttpStatusCode = System.Net.HttpStatusCode.BadRequest;
                    return response;
                }
                blog.Title = model.Title;
                blog.Body = model.Body;
                await _blogRepository.UpdateAsync(blog);
                result = blog.ToModel();
            }
            else
            {
                var blog = new BlogPost()
                {
                    Title = model.Title,
                    Body = model.Body,
                    UserId = userToken.UserId,
                    DateTimeCreate = DateTime.Now,
                    IsDeactivate = false
                };
                await _blogRepository.InsertAsync(blog);
                result = blog.ToModel(user); ;
            }

            response.Data = result;
            response.HttpStatusCode = System.Net.HttpStatusCode.OK;
            return response;
        }

    }
}
