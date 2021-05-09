using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace iNet.Entities
{
    public class ApiListProduct
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Unit { get; set; }
        public decimal SellPrice { get; set; }
        public decimal Price { get; set; }
        public decimal SellPriceMax { get; set; }
        public string Abstract { get; set; }
        public List<string> Images { get; set; }
    }

    public static class ApiProductsEmm
    {
        public static ApiListProduct ToListProductModel(this Product entity, List<string> images)
        {
            return new ApiListProduct
            {
                Id = entity.Id,
                Name = entity.Name,
                Unit = entity.Unit,
                Price = entity.Price,
                SellPrice = entity.SellPrice,
                SellPriceMax = entity.SellPriceMax,
                Abstract = entity.Abstract,
                Images = images
            };
        }
    }
}
