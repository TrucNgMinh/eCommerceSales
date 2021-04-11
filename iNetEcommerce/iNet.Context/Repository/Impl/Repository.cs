using iNet.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace iNet.Context
{
    public class Repository<TEntity> : IRepository<TEntity> where TEntity : BaseEntity
    {
        protected virtual IQueryable<TEntity> Query(Expression<Func<TEntity, bool>> whereClause, bool includeDeleted)
        {
            using (var context = new INetEcommerceContext())
            {
                var query = from b in context.Set<TEntity>()
                            select b;

                if (whereClause != null)
                {
                    query = query.Where(whereClause);
                }

                if (includeDeleted) return query;

                return query.Where(p => p.IsDeleted != true);
            }
        }

        protected virtual IQueryable<TEntity> Query(Expression<Func<TEntity, bool>> whereClause, bool includeDeleted,  bool includeDeactivated)
        {
                var query = Query(whereClause, includeDeleted);

                if (includeDeactivated) return query;

                return query.Where(p => p.IsDeactivate == false);
        }

        public virtual async Task<List<TEntity>> GetAllAsync(bool includeDeleted = false)
        {
            using (var context = new INetEcommerceContext())
            {
                var query = context.Set<TEntity>();

                if (includeDeleted) return await query.ToListAsync();

                return await query.Where(p => p.IsDeleted != true).ToListAsync();
            }
        }

        public virtual async Task<List<TEntity>> GetAllAsync(Expression<Func<TEntity, bool>> whereClause, bool includeDeleted = false)
        {
            using (var context = new INetEcommerceContext())
            {
                var query = from b in context.Set<TEntity>()
                            select b;

                if (whereClause != null)
                {
                    query = query.Where(whereClause);
                }

                if (includeDeleted) return await query.ToListAsync();

                return await query.Where(p => p.IsDeleted != true).ToListAsync();
            }
        }

        public virtual async Task<TEntity> GetAsync(Expression<Func<TEntity, bool>> whereClause, bool includeDeleted = false) {

            using (var context = new INetEcommerceContext())
            {
                var query = from b in context.Set<TEntity>()
                            select b;

                if (whereClause != null)
                {
                    query = query.Where(whereClause);
                }

                if (includeDeleted) return await query.FirstOrDefaultAsync();

                return await query.Where(p => p.IsDeleted != true).FirstOrDefaultAsync();
            }
        }

        public virtual async Task<TEntity> GetByIdAsync(object id)
        {
            using (var context = new INetEcommerceContext())
            {
                return await context.Set<TEntity>().FindAsync(id);
            }
        }

        public virtual async Task<List<TEntity>> GetByIdAsync(IEnumerable<int> id)
        {
            using (var context = new INetEcommerceContext())
            {
                var query = from ent in context.Set<TEntity>()
                            where id.Contains(ent.Id)
                            select ent;

                return await query.ToListAsync();
            }
        }

        public virtual async Task<bool> ExistsAsync(int id)
        {
            using (var context = new INetEcommerceContext())
            {
                return await context.Set<TEntity>().AnyAsync(p => p.Id == id);
            }
        }

        public virtual async Task<bool> ExistsAsync(Expression<Func<TEntity, bool>> whereClause, bool includeDeleted = false)
        {
            using (var context = new INetEcommerceContext())
            {
                var query = from b in context.Set<TEntity>()
                            select b;

                if (whereClause != null)
                {
                    query = query.Where(whereClause);
                }

                if (includeDeleted) return await query.AnyAsync();

                return await query.Where(p => p.IsDeleted != true).AnyAsync();
            }
        }

        public virtual async Task<int> InsertAsync(TEntity entity)
        {
            using (var context = new INetEcommerceContext())
            {
                await context.Set<TEntity>().AddAsync(entity);
                return await context.SaveChangesAsync();
            }
        }

        public virtual async Task<int> InsertAsync(IEnumerable<TEntity> entities)
        {
            using (var context = new INetEcommerceContext())
            {
                foreach (var entity in entities)
                {
                    await context.Set<TEntity>().AddAsync(entity);
                }
                return await context.SaveChangesAsync();
            }
        }

        public virtual async Task<int> DeleteAsync(int id, bool deleteFromDatabase = false)
        {
            using (var context = new INetEcommerceContext())
            {
                try
                {
                    TEntity entity = context.Set<TEntity>().FindAsync(id).Result;

                    if (entity == null)
                        throw new ArgumentNullException("entity");

                    if (deleteFromDatabase)
                        context.Set<TEntity>().Remove(entity);
                    else
                        entity.IsDeleted = true;

                   return await context.SaveChangesAsync();
                }
                catch (Exception dbEx)
                {
                    var msg = dbEx.ToString();
                    throw new Exception(msg, dbEx);
                }
            }
        }

        public virtual async Task<int> DeleteAsync(TEntity entity, bool deleteFromDatabase = false)
        {
            using (var context = new INetEcommerceContext())
            {
                try
                {
                    if (entity == null)
                        throw new ArgumentNullException("entity");

                    if (deleteFromDatabase)
                        context.Set<TEntity>().Remove(entity);
                    else
                        entity.IsDeleted = true;

                    return await context.SaveChangesAsync();
                }
                catch (Exception dbEx)
                {
                    var msg = dbEx.ToString();
                    throw new Exception(msg, dbEx);
                }
            }
        }

        public virtual async Task<int> DeleteAsync(IEnumerable<TEntity> entities, bool deleteFromDatabase = false)
        {
            using (var context = new INetEcommerceContext())
            {
                foreach (var entity in entities)
                {
                    try
                    {
                        if (entity == null)
                            throw new ArgumentNullException("entity");

                        if (deleteFromDatabase)
                            context.Set<TEntity>().Remove(entity);
                        else
                            entity.IsDeleted = true;
                    }
                    catch (Exception dbEx)
                    {
                        var msg = dbEx.ToString();
                        throw new Exception(msg, dbEx);
                    }
                }

                return await context.SaveChangesAsync();
            }
        }

        public virtual async Task<int> DeleteAsync()
        {
            using (var context = new INetEcommerceContext())
            {
                try
                {
                    var sqlCommand = string.Format("DELETE FROM {0}", typeof(TEntity).Name);
                    context.Database.ExecuteSqlRaw(sqlCommand);
                    return 0;
                }
                catch (Exception dbEx)
                {
                    var msg = dbEx.ToString();
                    throw new Exception(msg, dbEx);
                }
            }
        }

        public virtual async Task<int> UpdateAsync(TEntity entity)
        {
            using (var context = new INetEcommerceContext())
            {
                context.Set<TEntity>().Attach(entity);
                context.Entry(entity).State = EntityState.Modified;
                return await context.SaveChangesAsync();
            }
        }

        public virtual async Task<int> UpdateAsync(IEnumerable<TEntity> entities)
        {
            using (var context = new INetEcommerceContext())
            {
                foreach (var entity in entities)
                {
                    context.Set<TEntity>().Attach(entity);
                    context.Entry(entity).State = EntityState.Modified;
                }

                return await context.SaveChangesAsync();
            }
        }

        public virtual async Task<int> InsertOrReplaceAllAsync(IEnumerable<TEntity> entities)
        {
            using (var context = new INetEcommerceContext())
            {
                var existIds = context.Set<TEntity>().Where(p => p.IsDeleted != true).Select(p=>p.Id).ToList();

                foreach (var item in entities)
                {
                    if (!existIds.Contains(item.Id))
                    {
                        context.Set<TEntity>().Add(item);
                    }
                    else
                    {
                        context.Set<TEntity>().Attach(item);
                        context.Entry(item).State = EntityState.Modified;
                    }
                }

                return await context.SaveChangesAsync();
            }
        }

    }
}
