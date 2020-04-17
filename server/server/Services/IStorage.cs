using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Services
{
    public interface IStorage<T>
    {
        IQueryable<T> getCollection();
        T getItem(int id);
        T createItem(T item);
        void removeItem(T item);
        T updateItem(T item);
    }
}
