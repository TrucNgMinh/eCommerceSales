using iNet.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace iNet.Entities
{
    public class ApiBlogPost
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Creator { get; set; }
        public string Title { get; set; }
        public string Body { get; set; }
        public string Abstract { get; set; }
        public string Image { get; set; }
        public bool IsDeactivate { get; set; }
        public DateTime DateTimeCreate { get; set; }
    }

    public static class ApiBlogPostEmm
    {
        public static ApiBlogPost ToModel(this BlogPost entity, User user)
        {
            return new ApiBlogPost
            {
                Id = entity.Id,
                IsDeactivate = entity.IsDeactivate,
                UserId = entity.UserId,
                Title = entity.Title,
                Body = entity.Body,
                Abstract = entity.Abstract,
                Image = entity.Image,
                DateTimeCreate = entity.DateTimeCreate,
                Creator = user?.FullName,
            };
        }

        public static ApiBlogPost ToModel(this BlogPost entity)
        {
            return new ApiBlogPost
            {
                Id = entity.Id,
                IsDeactivate = entity.IsDeactivate,
                UserId = entity.UserId,
                Title = entity.Title,
                Body = entity.Body,
                Abstract = entity.Abstract,
                Image = entity.Image?.ToImageResource(),
                DateTimeCreate = entity.DateTimeCreate,
                Creator = entity.User?.FullName,
            };
        }
        public static IList<ApiBlogPost> ToListModel(this IList<BlogPost> entities)
        {
            var models = new List<ApiBlogPost>();

            entities.ToList().ForEach(p => models.Add(p.ToModel()));

            return models;
        }
    }
}
