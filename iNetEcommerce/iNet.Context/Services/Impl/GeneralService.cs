using iNet.Common;
using iNet.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Caching.Distributed;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace iNet.Context.Services.Impl
{
    public class GeneralService : BaseService, IGeneralService
    {
        private IRepository<Product> _productRepo;
        private IRepository<ProductGroup> _productGroupRepo;
        private IRepository<ProductImage> _productImageRepo;
        private IRepository<Config> _configRepo;
        public GeneralService()
        {
            _configRepo = new Repository<Config>();
            _productGroupRepo = new Repository<ProductGroup>();
            _productRepo = new Repository<Product>();
            _productImageRepo = new Repository<ProductImage>();
        }

        public async Task<ApiResponseModel> UpdateBanner(IFormFile banner1, IFormFile banner2, IFormFile banner3, IFormFile banner4)
        {
            var result = new ApiResponseModel();
            try
            {
                var config = await _configRepo.FirstOrDefaultAsync(null);
                if (config == null)
                {
                    config = new Config();
                    await _configRepo.InsertAsync(config);
                }
                if (banner1 != null)
                {
                    config.Banner1 = UtilCommon.ImageUpload(ApiConstants.FOLDELUPLOAD, banner1, config.Banner1, false);
                }
                if (banner2 != null)
                {
                    config.Banner2 = UtilCommon.ImageUpload(ApiConstants.FOLDELUPLOAD, banner2, config.Banner2, false);
                }
                if (banner3 != null)
                {
                    config.Banner3 = UtilCommon.ImageUpload(ApiConstants.FOLDELUPLOAD, banner3, config.Banner3, false);
                }
                if (banner4 != null)
                {
                    config.Banner4 = UtilCommon.ImageUpload(ApiConstants.FOLDELUPLOAD, banner4, config.Banner4, false);
                }

                await _configRepo.UpdateAsync(config);

                result.Data = true;
                result.HttpStatusCode = HttpStatusCode.OK;
                return result;
            }
            catch (Exception ex)
            {
                result.Error = ex.ToString();
                result.HttpStatusCode = HttpStatusCode.InternalServerError;
                return result;
            }

        }
    }
}
