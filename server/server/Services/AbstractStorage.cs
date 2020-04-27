﻿using System;
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
            return query;
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
            return query.SingleOrDefault(item => item.Id == id);
        }

        public T createItem(T item)
        {
            try
            {
                dbSet.Add(item);
                SaveChanges();
            }
            catch (Exception e)
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
            _context.Entry(item).State = EntityState.Modified;

            try
            {
                dbSet.Update(item);
                SaveChanges();
            }
            catch (Exception e)
            {
                throw e;
            }
            return item;
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
            try
            {
                SaveChanges();
            }
            catch (Exception e)
            {
                throw e;
            }
            return old;
        }
        public void SaveChanges()
        {
            _context.SaveChanges();
        }
    }
}
