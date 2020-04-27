using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using server.Models;
using server.Services;

namespace server.ResourceManagers
{
    public class AccountManager : IAccountManager
    {
        private readonly IStorage<Account> _accountStorage;

        public AccountManager(IStorage<Account> storage)
        {
            _accountStorage = storage;
        }

        public Account GetAccount(int id, string[] includes = null)
        {
            return _accountStorage.getItem(id, includes);
        }
        public Account AddAccount(Account account)
        {
            return _accountStorage.createItem(account);
        }

        public IQueryable<Account> GetAccounts(string[] includes = null)
        {
            return _accountStorage.getCollection(includes);
        }

        public IQueryable<Account> GetUserAccounts(int userId, string[] includes = null)
        {
            return _accountStorage.getCollection(includes)
                .Where(a => a.User.Id == userId);
        }

        public void DeleteAccount(Account account)
        {
            try
            {
                _accountStorage.removeItem(account);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public Account UpdateAccount(Account account, string[] includes = null)
        {
            return _accountStorage.updateItem(account, includes);
        }
    }
}
