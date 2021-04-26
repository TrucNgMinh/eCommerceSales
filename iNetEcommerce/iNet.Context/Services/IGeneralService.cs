using iNet.Common;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace iNet.Context.Services.Impl
{
    public interface IGeneralService
    {
        Task<ApiResponseModel> UpdateBanner(IFormFile banner1, IFormFile banner2, IFormFile banner3, IFormFile banner4);
    }
}
