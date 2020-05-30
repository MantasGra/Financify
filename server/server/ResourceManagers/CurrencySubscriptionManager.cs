using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using server.Models;
using server.Services;

namespace server.ResourceManagers
{
    public class CurrencySubscriptionManager : ICurrencySubscriptionManager
    {
        private readonly IStorage<CurrencySubscription> _currencySubscriptionStorage;

        public CurrencySubscriptionManager(IStorage<CurrencySubscription> storage)
        {
            _currencySubscriptionStorage = storage;
        }

        public CurrencySubscription GetCurrencySubscription(int id, string[] includes = null)
        {
            return _currencySubscriptionStorage.getItem(id, includes);
        }
        public CurrencySubscription AddCurrencySubscription(CurrencySubscription currencySubscription)
        {
            return _currencySubscriptionStorage.createItem(currencySubscription);
        }

        public IQueryable<CurrencySubscription> GetCurrencySubscriptions(string[] includes = null)
        {
            return _currencySubscriptionStorage.getCollection(includes);
        }

        public IQueryable<CurrencySubscription> GetUserCurrencySubscriptions(int userId, string currency = null, string[] includes = null)
        {
            IQueryable<CurrencySubscription> result;

            result = _currencySubscriptionStorage.getCollection(includes)
                .Where(cs => cs.User.Id == userId);

            if (currency != null)
            {
                result = result.Where(cs => cs.Currency.Equals(currency));
            }

            return result;
        }

        public void DeleteCurrencySubscription(CurrencySubscription currencySubscription)
        {
            try
            {
                _currencySubscriptionStorage.removeItem(currencySubscription);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public CurrencySubscription UpdateCurrencySubscription(CurrencySubscription currencySubscription, string[] includes = null)
        {
            return _currencySubscriptionStorage.updateItem(currencySubscription, includes);
        }
    }
}
