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
    //[Authorize]
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
  }
}
