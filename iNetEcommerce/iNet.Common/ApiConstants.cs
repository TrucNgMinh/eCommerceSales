using System;
using System.IO;

namespace iNet.Common
{
    public class ApiConstants
    {
        public const string API_KEY = "Hello_2019_iNetEcommerce";
        public const string API_ISSUER = "iNetEcommerce";
        public const string API_CLIENT = "iNetEcommerce";

        public static string FOLDELUPLOAD = Path.Combine("wwwroot", "Resources");
        public static readonly string[] ALLOWEDFILEEXTENSIONS = { ".jpg", ".gif", ".png" };
    }
}
