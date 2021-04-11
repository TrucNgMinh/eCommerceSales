using System;
using System.Collections.Generic;
using System.Net;
using System.Text;

namespace iNet.Common
{
    public class ApiResponseModel
    {
        public HttpStatusCode HttpStatusCode { get; set; }

        public string Error { get; set; }

        public object Data { get; set; }
    }
}
