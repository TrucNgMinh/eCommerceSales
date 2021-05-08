using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using iNet.Common;

namespace iNet.Entities
{
    public class ApiSettingModel
    {
        public string PrimaryColor { get; set; }
        public string Logo { get; set; }
        public string FavIcon { get; set; }
        public string WebTitle { get; set; }

        public string Banner1 { get; set; }
        public string Banner2 { get; set; }
        public string Banner3 { get; set; }
        public string Banner4 { get; set; }
    }

    public static class ApiSettingModelEmm
    {
        public static ApiSettingModel ToModel(this Config entity)
        {
            return new ApiSettingModel
            {
                PrimaryColor = entity.PrimaryColor,
                Logo = entity.Logo.ToImageResource(),
                FavIcon = entity.FavIcon.ToImageResource(),
                WebTitle = entity.WebTitle,
                Banner1 = entity.Banner1.ToImageResource(),
                Banner2 = entity.Banner2.ToImageResource(),
                Banner3 = entity.Banner3.ToImageResource(),
                Banner4 = entity.Banner4.ToImageResource(),
            };
        }

    }
}
