using Microsoft.AspNet.OData.Routing;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace iNetEcommerce.Controllers
{
  /// <summary>
  /// Represents a RESTful service of General.
  /// </summary>
  [ApiVersion("1.0")]
  [ODataRoutePrefix("Home")]
  [Route("api/v{version:apiVersion}/[controller]")]
  public class HomeController : BaseController
  {
    public HomeController() : base()
    {
      
    }
  }
}
