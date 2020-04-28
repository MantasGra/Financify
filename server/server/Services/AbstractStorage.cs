using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc.ApiExplorer;
using System.Reflection.Metadata;

namespace server.Services
{
    public class AbstractStorage<T> : IStorage<T> where T : Model
    {
        internal DatabaseContext _context = new DatabaseContext();
        internal DbSet<T> dbSet;


        public AbstractStorage()
        {
            dbSet = _context.Set<T>();
        }

        public IQueryable<T> getCollection(string[] includes = null)
        {
            IQueryable<T> query = dbSet;
            if (includes != null)
            {
                foreach (string include in includes)
                {
                    query = query.Include(include);
                }
            }
            return query.AsNoTracking();
        }
        public T getItem(int id, string[] includes = null)
        {
            IQueryable<T> query = dbSet.AsQueryable();
            if (includes != null)
            {
                foreach (string include in includes)
                {
                    query = query.Include(include);
                }
            }
            return query
                .AsNoTracking()
                .SingleOrDefault(item => item.Id == id);
        }

        public T createItem(T item)
        {
            _context.Entry(item).State = EntityState.Added;
            try
            {
                SaveChanges();
            }
            catch (Exception e)
            {
                throw e;
            }
            _context.Entry(item).State = EntityState.Detached;
            return item;
        }

        public void removeItem(T item)
        {
            _context.Entry(item).State = EntityState.Deleted;
            try
            {
                SaveChanges();
            }
            catch (Exception e)
            {
                throw e;
            }
            _context.Entry(item).State = EntityState.Detached;
        }

        public T updateItem(T item, string[] includes = null)
        {
            _context.Entry(item).State = EntityState.Modified;
            try
            {
                _context.SaveChanges();
            }
            catch (Exception e)
            {
                throw e;
            }
            _context.Entry(item).State = EntityState.Detached;
            return getItem(item.Id, includes);
        }
        public T updateItem(T old, T newItem)
        {
            foreach (var property in typeof(T).GetProperties())
            {
                if (property.Name == "Id")
                {
                    continue;
                }
                if (property.GetValue(newItem) != null)
                    property.SetValue(old, property.GetValue(newItem));
            }
            _context.Entry(old).State = EntityState.Modified;
            try
            {
                SaveChanges();
            }
            catch (Exception e)
            {
                throw e;
            }
            _context.Entry(old).State = EntityState.Detached;
            return old;
        }
        public void SaveChanges()
        {
            _context.SaveChanges();
        }
    }
}
