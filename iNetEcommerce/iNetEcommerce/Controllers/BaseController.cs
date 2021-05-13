using iNet.Common;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Threading.Tasks;

namespace iNetEcommerce.Controllers
{
    public abstract class BaseController : ControllerBase
    {

        public BaseController()
        {

        }

        protected UserTokenModel GetUserIdentify()
        {

            //Get user id from token - using on future
            var userToken = new UserTokenModel();

            //var identity = HttpContext.User.Identity as System.Security.Claims.ClaimsIdentity;

            //if (identity == null)
            //{
            //    userToken.UserId = 0;
            //}
            //else
            //{
            //    //userToken.UserId = Convert.ToInt32(identity.Claims.Where(p => p.Type == ClaimTypes.NameIdentifier).FirstOrDefault().Value);
            //    userToken.UserId = 1;
            //    userToken.UserName = identity.Name;
            //    userToken.Hash = long.Parse(identity.Claims.Where(p => p.Type == ClaimTypes.Hash).FirstOrDefault().Value);
            //}

            return userToken;
        }

        protected IActionResult GetServerErrorResult(string ex)
        {
            var response = new ApiErrorModel();
            response.Error.Code = HttpStatusCode.InternalServerError.ToString();
            response.Error.Message = ErrorMessageCode.SERVER_ERROR;
            response.Error.InnerError = ex;
            return StatusCode(StatusCodes.Status500InternalServerError, response);
        }

        protected IActionResult GetOKResult(object result)
        {
            return Ok(result);
        }

        protected IActionResult GetBadRequestResult(string message)
        {
            var response = new ApiErrorModel();
            response.Error.Code = HttpStatusCode.BadRequest.ToString();
            response.Error.Message = message;

            return BadRequest(response);
        }

        protected IActionResult GetNotFoundResult(string message)
        {
            var response = new ApiErrorModel();
            response.Error.Code = HttpStatusCode.BadRequest.ToString();
            response.Error.Message = message;

            return NotFound(response);
        }

        protected IActionResult GetResult(ApiResponseModel model)
        {
            if (model.HttpStatusCode == HttpStatusCode.InternalServerError)
            {
                var response = new ApiErrorModel();
                response.Error.Code = HttpStatusCode.InternalServerError.ToString();
                response.Error.Message = ErrorMessageCode.SERVER_ERROR;
                response.Error.InnerError = model.Error;
                return StatusCode(StatusCodes.Status500InternalServerError, response);
            }
            else if (model.HttpStatusCode == HttpStatusCode.NotFound)
            {
                var response = new ApiErrorModel();
                response.Error.Code = HttpStatusCode.NotFound.ToString();
                response.Error.Message = model.Error;
                return NotFound(response);
            }
            else if (model.HttpStatusCode == HttpStatusCode.BadRequest)
            {
                var response = new ApiErrorModel();
                response.Error.Code = HttpStatusCode.BadRequest.ToString();
                response.Error.Message = model.Error;
                return BadRequest(response);
            }
            else
            {
                return Ok(model.Data);
            }
        }
    }
}
