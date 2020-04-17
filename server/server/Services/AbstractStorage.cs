using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Models;
using Microsoft.EntityFrameworkCore;

namespace server.Services
{
    public class AbstractStorage<T> : IStorage<T> where T : class
    {
        internal DatabaseContext _context = new DatabaseContext();
        internal DbSet<T> dbSet;

        public AbstractStorage()
        {
            dbSet = _context.Set<T>();
        }

        public IQueryable<T> getCollection()
        {
            return dbSet;
        }
        public T getItem(int id)
        {
            return dbSet.Find(id);
        }

        public T createItem(T item)
        {
            try
            {
                dbSet.Add(item);
                SaveChanges();
            } 
            catch(Exception e)
            {
                throw e;
            }
            return item;
        }

        public void removeItem(T item)
        {
            try
            {
                dbSet.Remove(item);
                SaveChanges();
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public T updateItem(T item)
        {
            try {
                dbSet.Update(item);
                SaveChanges();
            }
            catch (Exception e)
            {
                throw e;
            }
            return item;
        }
        public void SaveChanges()
        {
            _context.SaveChanges();
        }
    }
}
