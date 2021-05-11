using Microsoft.AspNet.OData.Routing;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Primitives;
using System;
using System.Linq;
using static Microsoft.AspNetCore.Http.StatusCodes;
using System.Security.Claims;
using System.Threading.Tasks;
using iNet.Common;
using iNet.Context.Services.Impl;
using iNet.Entities;
using System.Collections.Generic;

namespace iNetEcommerce.Controllers
{
    [ApiController]
    [ApiVersion("1.0")]
    [ODataRoutePrefix("Products")]
    [Route("api/v{version:apiVersion}/[controller]")]
    public class ProductsController : BaseController
    {
        private readonly IProductService _productService;
        public ProductsController(IProductService productService) : base()
        {
            _productService = productService;
        }

        /// <summary>
        /// Get product groups
        /// </summary>
        /// <param name="model"></param>
        /// <returns>The requested Product Group.</returns>
        /// <response code="200">Get Product Group was successfully</response>
        /// <response code="500">Server Error.</response>
        /// 
        [HttpGet]
        [MapToApiVersion("1.0")]
        [Produces("application/json")]
        [ProducesResponseType(typeof(List<ApiProductGroup>), Status200OK)]
        [ProducesResponseType(Status400BadRequest)]
        [ProducesResponseType(Status500InternalServerError)]
        [Route("[action]")]
        public async Task<IActionResult> GetProductGroups()
        {
            try
            {
                var result = await _productService.GetListProductGroups();

                return GetResult(result);
            }
            catch (Exception ex)
            {
                return GetServerErrorResult(ex.ToString());
            }
        }

        /// <summary>
        /// Add/Edit Product Group
        /// </summary>
        /// <param name="model"></param>
        /// <returns>The requested Product Group.</returns>
        /// <response code="200">Product Group was successfully</response>
        /// <response code="500">Server Error.</response>
        /// 
        [HttpPost]
        [MapToApiVersion("1.0")]
        [Produces("application/json")]
        [ProducesResponseType(typeof(List<ApiProductGroup>), Status200OK)]
        [ProducesResponseType(Status400BadRequest)]
        [ProducesResponseType(Status500InternalServerError)]
        [Route("[action]")]
        //[Authorize]
        public async Task<IActionResult> AddEditProductGroup([FromBody] ApiProductGroup model)
        {
            try
            {
                var result = await _productService.AddEditProductGroup(model);

                return GetResult(result);
            }
            catch (Exception ex)
            {
                return GetServerErrorResult(ex.ToString());
            }
        }
        /// <summary>
        /// Delete Product Group
        /// </summary>
        /// <param name="model"></param>
        /// <returns>Delete Product Group.</returns>
        /// <response code="200">Delete Product Group was successfully</response>
        /// <response code="500">Server Error.</response>
        /// 
        [HttpPost]
        [MapToApiVersion("1.0")]
        [Produces("application/json")]
        [ProducesResponseType(typeof(List<ApiProductGroup>), Status200OK)]
        [ProducesResponseType(Status400BadRequest)]
        [ProducesResponseType(Status500InternalServerError)]
        [Route("[action]")]
        //[Authorize]
        public async Task<IActionResult> DeleteProductGroup([FromBody] ApiProductGroup model)
        {
            try
            {
                var result = await _productService.DeleteProductGroups(model);

                return GetResult(result);
            }
            catch (Exception ex)
            {
                return GetServerErrorResult(ex.ToString());
            }
        }

        /// <summary>
        /// Get products
        /// </summary>
        /// <param name="model"></param>
        /// <returns>The requested Product.</returns>
        /// <response code="200">Get Product was successfully</response>
        /// <response code="500">Server Error.</response>
        /// 
        [HttpGet]
        [MapToApiVersion("1.0")]
        [Produces("application/json")]
        [ProducesResponseType(typeof(List<ApiListProduct>), Status200OK)]
        [ProducesResponseType(Status400BadRequest)]
        [ProducesResponseType(Status500InternalServerError)]
        [Route("[action]")]
        public async Task<IActionResult> GetProducts()
        {
            try
            {
                var result = await _productService.GetListProducts();

                return GetResult(result);
            }
            catch (Exception ex)
            {
                return GetServerErrorResult(ex.ToString());
            }
        }

        /// <summary>
        /// Get product
        /// </summary>
        /// <param name="model"></param>
        /// <returns>The requested Product.</returns>
        /// <response code="200">Get Product was successfully</response>
        /// <response code="500">Server Error.</response>
        /// 
        [HttpGet]
        [MapToApiVersion("1.0")]
        [Produces("application/json")]
        [ProducesResponseType(typeof(List<ApiProduct>), Status200OK)]
        [ProducesResponseType(Status400BadRequest)]
        [ProducesResponseType(Status500InternalServerError)]
        [Route("[action]")]
        public async Task<IActionResult> GetProduct(int productId)
        {
            try
            {
                var result = await _productService.GetProduct(productId);

                return GetResult(result);
            }
            catch (Exception ex)
            {
                return GetServerErrorResult(ex.ToString());
            }
        }

        /// <summary>
        /// Get product
        /// </summary>
        /// <param name="model"></param>
        /// <returns>The requested Product.</returns>
        /// <response code="200">Get Product was successfully</response>
        /// <response code="500">Server Error.</response>
        /// 
        [HttpGet]
        [MapToApiVersion("1.0")]
        [Produces("application/json")]
        [ProducesResponseType(typeof(List<ApiProduct>), Status200OK)]
        [ProducesResponseType(Status400BadRequest)]
        [ProducesResponseType(Status500InternalServerError)]
        [Route("[action]")]
        //[Authorize]
        public async Task<IActionResult> GetProductAdmin(int productId)
        {
            try
            {
                var result = await _productService.GetProduct(productId, true);

                return GetResult(result);
            }
            catch (Exception ex)
            {
                return GetServerErrorResult(ex.ToString());
            }
        }

        /// <summary>
        /// Delete Product
        /// </summary>
        /// <param name="model"></param>
        /// <returns>Delete Product.</returns>
        /// <response code="200">Delete Product was successfully</response>
        /// <response code="500">Server Error.</response>
        /// 
        [HttpPost]
        [MapToApiVersion("1.0")]
        [Produces("application/json")]
        [ProducesResponseType(typeof(ApiProduct), Status200OK)]
        [ProducesResponseType(Status400BadRequest)]
        [ProducesResponseType(Status500InternalServerError)]
        [Route("[action]")]
        //[Authorize]
        public async Task<IActionResult> DeleteProduct([FromBody] ApiProduct model)
        {
            try
            {
                var result = await _productService.DeleteProduct(model);

                return GetResult(result);
            }
            catch (Exception ex)
            {
                return GetServerErrorResult(ex.ToString());
            }
        }

        /// <summary>
        /// Add/Edit Product
        /// </summary>
        /// <param name="model"></param>
        /// <returns>The requested Product.</returns>
        /// <response code="200">Product was successfully</response>
        /// <response code="500">Server Error.</response>
        /// 
        [HttpPost]
        [MapToApiVersion("1.0")]
        [Produces("application/json")]
        [ProducesResponseType(typeof(ApiProduct), Status200OK)]
        [ProducesResponseType(Status400BadRequest)]
        [ProducesResponseType(Status500InternalServerError)]
        [Route("[action]")]
        //[Authorize]
        public async Task<IActionResult> AddEditProduct([FromForm] ApiProduct model, IFormFile image1, IFormFile image2, IFormFile image3, IFormFile image4)
        {
            try
            {
                var result = await _productService.AddEditProduct(model, image1, image2, image3, image4);

                return GetResult(result);
            }
            catch (Exception ex)
            {
                return GetServerErrorResult(ex.ToString());
            }
        }
    }
}
