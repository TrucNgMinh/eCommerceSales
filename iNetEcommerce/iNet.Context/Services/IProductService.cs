using iNet.Common;
using iNet.Entities;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace iNet.Context.Services.Impl
{
    public interface IProductService
    {
        Task<ApiResponseModel> GetListProductGroups();
        Task<ApiResponseModel> AddEditProductGroup(ApiProductGroup model);
        Task<ApiResponseModel> DeleteProductGroups(ApiProductGroup model);
        Task<ApiResponseModel> GetListProducts(int groupId = 0);
        Task<ApiResponseModel> DeleteProduct(ApiProduct model);
        Task<ApiResponseModel> AddEditProduct(ApiProduct model, IFormFile image1, IFormFile image2, IFormFile image3, IFormFile image4);
        Task<ApiResponseModel> GetProduct(int productId, bool isAdmin = false);
    }
}
