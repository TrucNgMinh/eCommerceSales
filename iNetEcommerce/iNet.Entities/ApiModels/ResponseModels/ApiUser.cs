using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace iNet.Entities
{
    public class ApiUser
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public string Token { get; set; }
        public string Phone { get; set; }
        public string SubPhone { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
        public string Image { get; set; }
    }

    public static class ApiUserEmm
    {
        public static ApiUser ToModel(this User entity)
        {
            return new ApiUser
            {
                Id = entity.Id,
                FullName = entity.FullName,
                Phone = entity.Phone,
                SubPhone = entity.SubPhone,
                Address = entity.Address,
                Email = entity.Email,
                Image = entity.Image,
            };
        }
        public static IList<ApiUser> ToListModel(this IList<User> entities)
        {
            var models = new List<ApiUser>();

            entities.ToList().ForEach(p => models.Add(p.ToModel()));

            return models;
        }
    }
}
