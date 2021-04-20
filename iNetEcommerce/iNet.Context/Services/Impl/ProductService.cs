using iNet.Common;
using iNet.Entities;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace iNet.Context.Services.Impl
{
    public class ProductService : IProductService
    {
        private IRepository<Product> _productRepo;
        private IRepository<ProductGroup> _productGroupRepo;
        private IRepository<ProductImage> _productImageRepo;

        public ProductService()
        {
            _productGroupRepo = new Repository<ProductGroup>();
            _productRepo = new Repository<Product>();
            _productImageRepo = new Repository<ProductImage>();
        }

        public async Task<ApiResponseModel> GetListProductGroups()
        {
            var response = new ApiResponseModel();

            var results = await _productGroupRepo.GetAllAsync();

            response.Data = results.ToListModel();
            response.HttpStatusCode = System.Net.HttpStatusCode.OK;
            return response;
        }

        public async Task<ApiResponseModel> DeleteProductGroups(ApiProductGroup model)
        {
            var response = new ApiResponseModel();

            await _productGroupRepo.DeleteAsync(model.Id);

            response.HttpStatusCode = System.Net.HttpStatusCode.OK;
            return response;
        }

        public async Task<ApiResponseModel> AddEditProductGroup(ApiProductGroup model)
        {
            var response = new ApiResponseModel();
            ProductGroup result = null;

            if (model.Id != 0)
            {
                var group = await _productGroupRepo.GetByIdAsync(model.Id);
                if (group == null)
                {
                    response.Error = ErrorMessageCode.GROUP_NOT_FOUND;
                    response.HttpStatusCode = System.Net.HttpStatusCode.BadRequest;
                    return response;
                }
                group.Name = model.Name;
                group.Unit = model.Unit;
                group.OrderNumber = model.OrderNumber;
                await _productGroupRepo.UpdateAsync(group);
                result = group;
            }
            else
            {
                var group = new ProductGroup()
                {
                    Name = model.Name,
                    Unit = model.Unit,
                    OrderNumber = model.OrderNumber
                };
                await _productGroupRepo.InsertAsync(group);
                result = group;
            }

            response.Data = result.ToModel();
            response.HttpStatusCode = System.Net.HttpStatusCode.OK;
            return response;
        }

    }
}
