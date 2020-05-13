using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Services
{
    public interface IStorage<T>
    {
        IQueryable<T> getCollection(string[] includes = null);
        T getItem(int id, string[] includes = null);
        T createItem(T item);
        void removeItem(T item);
        T updateItem(T item, string[] includes = null);
        void SaveChanges();
    }
}
