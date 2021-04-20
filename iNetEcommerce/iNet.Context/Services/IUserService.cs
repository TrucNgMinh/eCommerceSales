using iNet.Common;
using iNet.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace iNet.Context.Services.Impl
{
    public interface IUserService
    {
        Task<ApiResponseModel> LoginUser(RequestUserLogin loginModel);
    }
}
