using iNet.Context.Services.Impl;
using iNet.Entities;
using Microsoft.AspNet.OData.Routing;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using static Microsoft.AspNetCore.Http.StatusCodes;
using System.Linq;
using System.Threading.Tasks;

namespace iNetEcommerce.Controllers
{
    /// <summary>
    /// Represents a RESTful service of General.
    /// </summary>
    [ApiController]
    [ApiVersion("1.0")]
    [ODataRoutePrefix("Home")]
    [Route("api/v{version:apiVersion}/[controller]")]
    public class HomeController : BaseController
    {
        private readonly IGeneralService _generalService;
        public HomeController(IGeneralService generalService) : base()
        {
            _generalService = generalService;
        }

        /// <summary>
        /// Update Banner
        /// </summary>
        [HttpPost]
        [Produces("application/json")]
        [Route("[action]")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> UpdateBanner(IFormFile banner1, IFormFile banner2, IFormFile banner3, IFormFile banner4)
        {
            try
            {
                if (banner1 != null|| banner2 != null|| banner3 != null|| banner4 != null)
                {
                    return GetResult(await _generalService.UpdateBanner(banner1, banner2, banner3, banner4));
                }
                else
                {
                    return GetBadRequestResult("");
                }
            }
            catch (Exception ex)
            {
                return GetServerErrorResult(ex.ToString());
            }
        }

        /// <summary>
        /// Get Setting ApiSettingModel
        /// </summary>
        [HttpGet]
        [MapToApiVersion("1.0")]
        [Produces("application/json")]
        [ProducesResponseType(typeof(ApiSettingModel), Status200OK)]
        [ProducesResponseType(Status400BadRequest)]
        [ProducesResponseType(Status500InternalServerError)]
        [Route("[action]")]
        public async Task<IActionResult> GetSetting()
        {
            try
            {
                return GetResult(await _generalService.GetSetting());
            }
            catch (Exception ex)
            {
                return GetServerErrorResult(ex.ToString());
            }
        }
    }
}
