using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Models;

namespace server.ResourceManagers
{
    public interface ICurrencySubscriptionManager
    {
        CurrencySubscription GetCurrencySubscription(int id, string[] includes = null);
        CurrencySubscription AddCurrencySubscription(CurrencySubscription currencySubscription);
        IQueryable<CurrencySubscription> GetCurrencySubscriptions(string[] includes = null);
        IQueryable<CurrencySubscription> GetUserCurrencySubscriptions(int userId, string currency = null, string[] includes = null);
        void DeleteCurrencySubscription(CurrencySubscription currencySubscription);
        CurrencySubscription UpdateCurrencySubscription(CurrencySubscription currencySubscription, string[] includes = null);
    }
}
