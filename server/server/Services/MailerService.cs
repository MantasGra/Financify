using server.ResourceManagers;
using System.Net;
using System.Net.Mail;
using System.Collections.Generic;
using server.Models;
using System;

namespace server.Services
{
    public class MailerService : IMailerService
    {
        private readonly IEmailTemplateManager _templateManager;

        public MailerService(IEmailTemplateManager templateManager)
        {
            _templateManager = templateManager;
        }

        public void SendEmail(string receiver, int templateId, object[] bodyParams)
        {
            MailAddress from = new MailAddress("financify1@gmail.com");
            MailAddress to = new MailAddress(receiver);

            var smtp = GetClient();
            var template = _templateManager.GetTemplate(templateId);
            var message = GetMessage(template, from, to, bodyParams);
            smtp.Send(message);
        }

        public SmtpClient GetClient()
        {
            return new SmtpClient
            {
                Host = "smtp.gmail.com",
                Port = 587,
                EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential("financify1@gmail.com", "ISP2Projektas")
            };
        }

        public MailMessage GetMessage(EmailTemplate template, MailAddress from, MailAddress to, object[] bodyParams)
        {
            return new MailMessage(from, to)
            {
                Subject = template.Title,
                Body = String.Format(template.Content, bodyParams)
            };
        }
    }
}
