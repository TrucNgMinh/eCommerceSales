using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace iNet.Entities
{
    public class ApiProduct
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Unit { get; set; }
        public decimal Price { get; set; }
        public decimal SellPrice { get; set; }
        public decimal SellPriceMax { get; set; }
        public string Content { get; set; }
        public string Abstract { get; set; }
        public List<int> ProductGroups { get; set; }
        public List<string> Images { get; set; }
    }

    public static class ApiProductEmm
    {
        public static Product ToEntity(this ApiProduct entity, Product result = null)
        {
            return new Product
            {
                Id = result != null? result.Id : 0,
                Name = entity.Name,
                Unit = entity.Unit,
                Price = entity.Price,
                SellPrice = entity.SellPrice,
                SellPriceMax = entity.SellPriceMax,
                Content = entity.Content,
                Abstract = entity.Abstract,
            };
        }
        public static ApiProduct ToApiModel(this Product entity, List<string> images)
        {
            return new ApiProduct
            {
                Id = entity.Id,
                Name = entity.Name,
                Unit = entity.Unit,
                Price = entity.Price,
                SellPrice = entity.SellPrice,
                SellPriceMax = entity.SellPriceMax,
                Content = entity.Content,
                Abstract = entity.Abstract,
                Images = images
            };
        }
    }
}
