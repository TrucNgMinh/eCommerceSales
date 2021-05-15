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
        public async Task<IActionResult> UpdateBanner(IFormFile bannerFile1, IFormFile bannerFile2, IFormFile bannerFile3, IFormFile bannerFile4)
        {
            try
            {
                if (bannerFile1 != null|| bannerFile2 != null|| bannerFile3 != null|| bannerFile4 != null)
                {
                    return GetResult(await _generalService.UpdateBanner(bannerFile1, bannerFile2, bannerFile3, bannerFile4));
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
