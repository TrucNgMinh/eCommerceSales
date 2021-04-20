using iNet.Common;
using iNet.Entities;
using Microsoft.Extensions.Caching.Distributed;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace iNet.Context.Services.Impl
{
    public class UserService : BaseService, IUserService
    {
        private IRepository<User> _userRepo;
        public UserService()
        {
            _userRepo = new Repository<User>();
        }
        public async Task<ApiResponseModel> LoginUser(RequestUserLogin loginModel)
        {
            ApiResponseModel result = new ApiResponseModel();

            User user = await _userRepo.FirstOrDefaultAsync(p=>p.UserName == loginModel.UserName);

            if (user == null)
            {
                result.Error = ErrorMessageCode.USER_NOT_FOUND;
                result.HttpStatusCode = HttpStatusCode.NotFound;
                return result;
            }

            if (user.IsDeactivate)
            {
                result.Error = ErrorMessageCode.USER_IS_DEACTIVATE;
                result.HttpStatusCode = HttpStatusCode.Forbidden;
                return result;
            }

            try
            {
                var passcode = UtilCommon.GeneratePasscode(loginModel.PassWord, user.Hash);
                if (passcode.Equals(user.Passcode))
                {
                    result.HttpStatusCode = System.Net.HttpStatusCode.OK;
                    var data = user.ToModel();
                    data.Token = UtilCommon.GenerateToken(user.Id.ToString(), 1, user.UserRole);
                    result.Data = data;
                    return result;
                }
                else
                {
                    result.Error = ErrorMessageCode.PASSWORD_INCORRECT;
                    result.HttpStatusCode = System.Net.HttpStatusCode.NotFound;
                    return result;
                }
            }
            catch (Exception ex)
            {
                result.Error = ex.ToString();
                result.HttpStatusCode = System.Net.HttpStatusCode.InternalServerError;
                return result;
            }
        }
    }
}
