using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace iNet.Entities
{
  public class ApiProductGroup
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public string Unit { get; set; }
    public int OrderNumber { get; set; }
  }

  public static class ApiProductGroupEmm
  {
    public static ApiProductGroup ToModel(this ProductGroup entity)
    {
      return new ApiProductGroup
      {
        Id = entity.Id,
        Name = entity.Name,
        Unit = entity.Unit,
        OrderNumber = entity.OrderNumber,
      };
    }
    public static IList<ApiProductGroup> ToListModel(this IList<ProductGroup> entities)
    {
      var models = new List<ApiProductGroup>();

      entities.ToList().ForEach(p => models.Add(p.ToModel()));

      return models;
    }
  }
}
