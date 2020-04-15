using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Models;

namespace server.ResourceManagers
{
    public interface IAccountManager
    {
        Account GetAccount(int id);
        Account AddAccount(Account account);
        IQueryable<Account> GetAccounts();
        void DeleteAccount(Account account);

    }
}
