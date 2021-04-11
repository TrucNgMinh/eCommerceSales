using iNet.Common;
using iNet.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace iNet.Context.Services.Impl
{
  public interface IProductService
  {
    Task<ApiResponseModel> GetListProductGroups();
    Task<ApiResponseModel> AddEditProductGroup(ApiProductGroup model);
    Task<ApiResponseModel> DeleteProductGroups(ApiProductGroup model);
  }
}
