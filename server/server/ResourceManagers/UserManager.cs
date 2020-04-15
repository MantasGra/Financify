using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Models;
using server.Services;

namespace server.ResourceManagers
{
    public class UserManager : IUserManager
    {
        private readonly IStorage<User> _userStorage;

        public UserManager(IStorage<User> storage)
        {
            _userStorage = storage;
        }

        public User GetUser(int id)
        {
            return _userStorage.getItem(id);
        }
        public User AddUser(User user)
        {
            return _userStorage.createItem(user);
        }

        public IQueryable<User> GetUsers()
        {
            return _userStorage.getCollection();
        }

        public void DeleteUser(User user)
        {
            try
            {
                _userStorage.removeItem(user);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}
