using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Models;

namespace server.ResourceManagers
{
    public interface IUserManager
    {
        User GetUser(int id);
        User AddUser(User user);
        IQueryable<User> GetUsers();
        void DeleteUser(User user);

    }
}
