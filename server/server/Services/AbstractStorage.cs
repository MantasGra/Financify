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


    public class AbstractStorage<T> : IStorage<T> where T : AModel
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
        public T getItem(int id, string[] includes = null)
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
