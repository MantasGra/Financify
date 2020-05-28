using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using FluentScheduler;
using Microsoft.AspNetCore.Localization;
using Newtonsoft.Json;
using server.Models;
using server.ResourceManagers;

namespace server.Services
{
    public class GoodCurrencyPriceCron : Registry
    {
        private readonly ICurrencySubscriptionManager _resourceManager;

        private readonly IEmailTemplateManager _templateManager;

        public GoodCurrencyPriceCron(ICurrencySubscriptionManager resourceManager, IEmailTemplateManager templateManager)
        {
            _resourceManager = resourceManager;
            _templateManager = templateManager;

            Schedule(() => Execute()).ToRunNow();
        }

        private void Execute()
        {
            IQueryable<CurrencySubscription> currencySubscriptions = _resourceManager.GetCurrencySubscriptions(new string[] { "User" });
            foreach (var currencySubscription in currencySubscriptions)
            {
                var latestPrice = CheckForGoodPrice(currencySubscription.Currency);
                if (latestPrice > 0)
                {
                    SendEmail("martis.kasparavicius@gmail.com", currencySubscription.Currency, latestPrice);
                }
            }
        }

        public double CheckForGoodPrice(string currency)
        {
            var latestPrice = GetLatestRate(currency);
            if (latestPrice < GetLastMonthAverageRate(currency))
            {
                return latestPrice;
            }
            return 0;
        }

        public double GetLastMonthAverageRate(string currency)
        {
            try
            {
                var month = new DateTime(DateTime.Today.Year, DateTime.Today.Month, 1);
                var first = month.AddMonths(-1);
                var last = month.AddDays(-1);
                var firstDate = first.ToString("yyyy-MM-dd");
                var lastDate = last.ToString("yyyy-MM-dd");

                String URLString = $"https://api.exchangeratesapi.io/history?start_at={firstDate}&end_at={lastDate}&base=USD&symbols={currency}";
                using (var webClient = new System.Net.WebClient())
                {
                    var json = webClient.DownloadString(URLString);
                    dynamic Test = JsonConvert.DeserializeObject<dynamic>(json);

                    int days = DateTime.DaysInMonth(first.Year, first.Month);
                    double sum = 0;
                    int foundDays = 0;

                    for (int day = 1; day <= days; day++)
                    {
                        var checkDate = new DateTime(first.Year, first.Month, day).ToString("yyyy-MM-dd");
                        if(Test.rates[checkDate] != null)
                        {
                            sum += Convert.ToDouble(Test.rates[checkDate][currency]);
                            foundDays++;
                        }
                    }

                    return (sum / foundDays);
                }
            }
            catch (Exception)
            {
                return 0;
            }
        }

        public double GetLatestRate(string currency)
        {
            try
            {
                String URLString = $"https://api.exchangeratesapi.io/latest?base=USD&symbols={currency}";
                using (var webClient = new System.Net.WebClient())
                {
                    var json = webClient.DownloadString(URLString);
                    dynamic Test = JsonConvert.DeserializeObject<dynamic>(json);
                    return Convert.ToDouble(Test.rates[currency]);
                }
            }
            catch (Exception)
            {
                return 0;
            }
        }

        public void SendEmail(string email, string currency, double price)
        {
            MailAddress from = new MailAddress("financify1@gmail.com");
            MailAddress to = new MailAddress(email);

            var smtp = new SmtpClient
            {
                Host = "smtp.gmail.com",
                Port = 587,
                EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential(from.Address, "ISP2Projektas")
            };

            var template = _templateManager.GetTemplate(1);

            using (var message = new MailMessage(from, to)
            {
                Subject = template.Title,
                Body = String.Format(template.Content, currency, price),
            })
            {
                smtp.Send(message);
            }
        }
    }

    public class LatestRate
    {
        public string Symbol { get; set; }
        public double Rate { get; set; }

        public LatestRate(string Symbol, double Rate)
        {
            this.Symbol = Symbol;
            this.Rate = Rate;
        }
    }
}
