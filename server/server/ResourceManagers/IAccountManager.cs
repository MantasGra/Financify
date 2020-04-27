using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Models;

namespace server.ResourceManagers
{
    public interface IAccountManager
    {
        Account GetAccount(int id, string[] includes = null);
        Account AddAccount(Account account);
        IQueryable<Account> GetAccounts(string[] includes = null);
        IQueryable<Account> GetUserAccounts(int userId, string[] includes = null);
        void DeleteAccount(Account account);
        Account UpdateAccount(Account account, string[] includes = null);
    }
}
