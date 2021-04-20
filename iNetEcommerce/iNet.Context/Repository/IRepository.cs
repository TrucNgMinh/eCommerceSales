using iNet.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace iNet.Context
{
    public interface IRepository<TEntity> where TEntity : BaseEntity
    {
        Task<List<TEntity>> GetAllAsync(bool includeDeleted = false);
        Task<List<TEntity>> GetAllAsync(Expression<Func<TEntity, bool>> whereClause, bool includeDeleted = false);

        Task<List<TEntity>> GetByIdAsync(IEnumerable<int> id);
        Task<TEntity> GetAsync(Expression<Func<TEntity, bool>> whereClause, bool includeDeleted = false);
        Task<TEntity> GetByIdAsync(object id);
        Task<bool> ExistsAsync(int id);
        Task<bool> ExistsAsync(Expression<Func<TEntity, bool>> whereClause, bool includeDeleted = false);

        Task<int> InsertAsync(TEntity entity);
        Task<int> InsertAsync(IEnumerable<TEntity> entities);

        Task<int> DeleteAsync(int id, bool deleteFromDatabase = false);
        Task<int> DeleteAsync(TEntity entity, bool deleteFromDatabase = false);
        Task<int> DeleteAsync(IEnumerable<TEntity> entities, bool deleteFromDatabase = false);
        Task<int> DeleteAsync();

        Task<int> UpdateAsync(TEntity entity);
        Task<int> UpdateAsync(IEnumerable<TEntity> entities);

        Task<int> InsertOrReplaceAllAsync(IEnumerable<TEntity> entities);

        Task<TEntity> FirstOrDefaultAsync(Expression<Func<TEntity, bool>> whereClause);
    }
}
