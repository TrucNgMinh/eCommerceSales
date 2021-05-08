using iNet.Context;
using iNet.Context.Services.Impl;
using iNet.Entities;
using Microsoft.AspNet.OData.Routing;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static Microsoft.AspNetCore.Http.StatusCodes;

namespace iNetEcommerce.Controllers
{
    [ApiController]
    [ApiVersion("1.0")]
    [ODataRoutePrefix("Blogs")]
    [Route("api/v{version:apiVersion}/[controller]")]
    public class BlogController : BaseController
    {
        private readonly IBlogService _blogService;
        public BlogController(IBlogService blogService) : base()
        {
            _blogService = blogService;
        }

        /// <summary>
        /// Get blogs
        /// </summary>
        /// <param name="model"></param>
        /// <returns>The requested blogs.</returns>
        /// <response code="200">Get blogs was successfully</response>
        /// <response code="500">Server Error.</response>
        /// 
        [HttpGet]
        [MapToApiVersion("1.0")]
        [Produces("application/json")]
        [ProducesResponseType(typeof(List<ApiBlogPost>), Status200OK)]
        [ProducesResponseType(Status400BadRequest)]
        [ProducesResponseType(Status500InternalServerError)]
        [Route("[action]")]
        public async Task<IActionResult> GetListBlog()
        {
            try
            {
                var model = new RequestGetBlogPost();

                var result = await _blogService.GetListBlogs(model);

                return GetResult(result);
            }
            catch (Exception ex)
            {
                return GetServerErrorResult(ex.ToString());
            }
        }

        /// <summary>
        /// Add/Edit Blog
        /// </summary>
        /// <param name="model"></param>
        /// <returns>The requested Blog.</returns>
        /// <response code="200">Blog was successfully</response>
        /// <response code="500">Server Error.</response>
        /// 
        [HttpPost]
        [MapToApiVersion("1.0")]
        [Produces("application/json")]
        [ProducesResponseType(typeof(List<ApiBlogPost>), Status200OK)]
        [ProducesResponseType(Status400BadRequest)]
        [ProducesResponseType(Status500InternalServerError)]
        [Route("[action]")]
        [Authorize]
        public async Task<IActionResult> AddEditBlog([FromBody] RequestBlogPost model, IFormFile image)
        {
            try
            {
                var userToken = GetUserIdentify();
                var result = await _blogService.AddEditBlog(model, userToken, image);

                return GetResult(result);
            }
            catch (Exception ex)
            {
                return GetServerErrorResult(ex.ToString());
            }
        }

        /// <summary>
        /// Delete Blog
        /// </summary>
        /// 
        [HttpPost]
        [MapToApiVersion("1.0")]
        [Produces("application/json")]
        [ProducesResponseType(typeof(bool), Status200OK)]
        [ProducesResponseType(Status400BadRequest)]
        [ProducesResponseType(Status500InternalServerError)]
        [Route("[action]")]
        [Authorize]
        public async Task<IActionResult> DeleteBlog([FromBody] RequestBlogPost model)
        {
            try
            {
                var result = await _blogService.DeleteBlog(model);

                return GetResult(result);
            }
            catch (Exception ex)
            {
                return GetServerErrorResult(ex.ToString());
            }
        }

    }
}
