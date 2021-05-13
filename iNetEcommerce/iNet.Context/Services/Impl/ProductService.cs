using iNet.Common;
using iNet.Entities;
using Microsoft.AspNetCore.Http;
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
        private IRepository<ProductCategoryMap> _productCategoryRepo;

        public ProductService()
        {
            _productGroupRepo = new Repository<ProductGroup>();
            _productRepo = new Repository<Product>();
            _productImageRepo = new Repository<ProductImage>();
            _productCategoryRepo = new Repository<ProductCategoryMap>();
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

            await _productGroupRepo.DeleteAsync(model.Id, true);

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

        public async Task<ApiResponseModel> GetProduct(int productId, bool isAdmin = false)
        {
            var response = new ApiResponseModel();
            Product product = await _productRepo.GetByIdAsync(productId);
            if (product == null)
            {
                response.Error = ErrorMessageCode.PRODUCT_NOT_FOUND;
                response.HttpStatusCode = System.Net.HttpStatusCode.BadRequest;
                return response;
            }

            var images = await _productImageRepo.GetAllAsync(p => p.ProductId == productId);
            var data = product.ToApiModel(images.Select(p => p.Image.ToImageResource()).ToList());
            data.ProductGroups = (await _productCategoryRepo.GetAllAsync(p => p.ProductId == productId)).Select(p => p.ProductGroupId).ToList();

            if (!isAdmin) data.Price = 0;

            response.Data = data;
            response.HttpStatusCode = System.Net.HttpStatusCode.OK;
            return response;
        }

        public async Task<ApiResponseModel> GetListProducts(int groupId = 0)
        {
            var response = new ApiResponseModel();
            List<Product> products = new List<Product>();
            if(groupId == 0)
                products = await _productRepo.GetAllAsync();
            else
            {
                var productMaps = (await (_productCategoryRepo.GetAllAsync(p => p.ProductGroupId == groupId))).Select(p => p.ProductId).ToList();
                products = await _productRepo.GetAllAsync(p => productMaps.Contains(p.Id));
            }

            List<ApiListProduct> resuilts = new List<ApiListProduct>();
            foreach (var product in products)
            {
                var images = await _productImageRepo.GetAllAsync(p => p.ProductId == product.Id);
                var groups = (await _productCategoryRepo.GetAllAsync(p => p.ProductId == product.Id)).Select(p => p.ProductGroupId).ToList();
                resuilts.Add(product.ToListProductModel(images.Select(p => p.Image.ToImageResource()).ToList(), groups));
            }

            response.Data = resuilts;
            response.HttpStatusCode = System.Net.HttpStatusCode.OK;
            return response;
        }

        public async Task<ApiResponseModel> DeleteProduct(ApiProduct model)
        {
            var response = new ApiResponseModel();

            await _productRepo.DeleteAsync(model.Id, true);

            response.HttpStatusCode = System.Net.HttpStatusCode.OK;
            return response;
        }

        public async Task<ApiResponseModel> AddEditProduct(ApiProduct model, IFormFile image1, IFormFile image2, IFormFile image3, IFormFile image4)
        {
            var response = new ApiResponseModel();
            Product result = null;

            if (model.Id != 0)
            {
                result = await _productRepo.GetByIdAsync(model.Id);
                if (result == null)
                {
                    response.Error = ErrorMessageCode.PRODUCT_NOT_FOUND;
                    response.HttpStatusCode = System.Net.HttpStatusCode.BadRequest;
                    return response;
                }
                result = model.ToEntity(result);
                await _productRepo.UpdateAsync(result);
            }
            else
            {
                result = model.ToEntity();
                await _productRepo.InsertAsync(result);
            }

            var groups = await _productCategoryRepo.GetAllAsync(p => p.ProductId == result.Id);
            var delete = groups.Where(p => !model.ProductGroups.Contains(p.ProductGroupId)).ToList();
            await _productCategoryRepo.DeleteAsync(delete, true);
            foreach (var item in model.ProductGroups)
            {
                if(!groups.Any(p=>p.ProductGroupId == item))
                {
                    var map = new ProductCategoryMap() { ProductGroupId = item, ProductId = result.Id};
                    await _productCategoryRepo.InsertAsync(map);
                }
            }

            var images = await _productImageRepo.GetAllAsync(p => p.ProductId == result.Id);
            if (image1 != null)
            {
                if (images.Count >= 1)
                {
                    images[0].Image = UtilCommon.ImageUpload(ApiConstants.FOLDELUPLOAD, image1, images[0].Image, false);
                }
                else
                {
                    await _productImageRepo.InsertAsync(new ProductImage(result.Id, UtilCommon.ImageUpload(ApiConstants.FOLDELUPLOAD, image1, "", false)));
                }
            }
            if (image2 != null)
            {
                if (images.Count >= 2)
                {
                    images[1].Image = UtilCommon.ImageUpload(ApiConstants.FOLDELUPLOAD, image2, images[1].Image, false);
                }
                else
                {
                    await _productImageRepo.InsertAsync(new ProductImage(result.Id, UtilCommon.ImageUpload(ApiConstants.FOLDELUPLOAD, image2, "", false)));
                }
            }
            if (image3 != null)
            {
                if (images.Count >= 3)
                {
                    images[2].Image = UtilCommon.ImageUpload(ApiConstants.FOLDELUPLOAD, image3, images[2].Image, false);
                }
                else
                {
                    await _productImageRepo.InsertAsync(new ProductImage(result.Id, UtilCommon.ImageUpload(ApiConstants.FOLDELUPLOAD, image3, "", false)));
                }
            }
            if (image4 != null)
            {
                if (images.Count >= 4)
                {
                    images[3].Image = UtilCommon.ImageUpload(ApiConstants.FOLDELUPLOAD, image4, images[3].Image, false);
                }
                else
                {
                    await _productImageRepo.InsertAsync(new ProductImage(result.Id, UtilCommon.ImageUpload(ApiConstants.FOLDELUPLOAD, image4, "", false)));
                }
            }
            await _productImageRepo.UpdateAsync(images);

            images = await _productImageRepo.GetAllAsync(p => p.ProductId == result.Id);
            var data = result.ToApiModel(images.Select(p => p.Image.ToImageResource()).ToList());
            data.ProductGroups = (await _productCategoryRepo.GetAllAsync(p => p.ProductId == result.Id)).Select(p => p.ProductGroupId).ToList();

            response.Data = data;
            response.HttpStatusCode = System.Net.HttpStatusCode.OK;
            return response;
        }

    }
}
