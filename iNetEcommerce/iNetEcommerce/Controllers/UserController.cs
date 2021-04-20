using iNet.Common;
using iNet.Context.Services.Impl;
using iNet.Entities;
using Microsoft.AspNet.OData.Routing;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using static Microsoft.AspNetCore.Http.StatusCodes;

namespace iNetEcommerce.Controllers
{
    [ApiController]
    [ApiVersion("1.0")]
    [ODataRoutePrefix("User")]
    [Route("api/v{version:apiVersion}/[controller]")]
    public class UserController : BaseController
    {
        private readonly IUserService _userService;
        public UserController(IUserService userService) : base()
        {
            _userService = userService;
        }


        /// <summary>
        /// Get user token
        /// </summary>
        /// <param name="user">The requested user identifier.</param>
        /// <returns>The requested user.</returns>
        /// <response code="200">The user was successfully retrieved.</response>
        /// <response code="400">The user is not found</response>
        /// <response code="500">Server Error.</response>
        /// 
        [HttpPost]
        [MapToApiVersion("1.0")]
        [Produces("application/json")]
        [ProducesResponseType(typeof(ApiUser), Status200OK)]
        [ProducesResponseType(Status400BadRequest)]
        [ProducesResponseType(Status500InternalServerError)]
        [Route("[action]")]
        public async Task<IActionResult> Login([FromBody] RequestUserLogin user)
        {
            if (user == null || string.IsNullOrWhiteSpace(user.PassWord)) 
                return GetBadRequestResult(ErrorMessageCode.USER_NOT_FOUND);

            try
            {
                var response = await _userService.LoginUser(user);

                return GetResult(response);
            }
            catch (Exception ex)
            {
                return GetServerErrorResult(ex.ToString());
            }
        }
    }
}
