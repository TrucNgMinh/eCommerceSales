using iNet.Entities;
using Microsoft.Extensions.Caching.Distributed;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace iNet.Context.Services.Impl
{
  public class GeneralService : BaseService, IGeneralService
  {
    private IRepository<Product> _productRepo;
    private IRepository<ProductGroup> _productGroupRepo;
    private IRepository<ProductImage> _productImageRepo;
    public GeneralService()
    {
      _productGroupRepo = new Repository<ProductGroup>();
      _productRepo = new Repository<Product>();
      _productImageRepo = new Repository<ProductImage>();
    }

  }
}
