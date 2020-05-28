using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using server.Models;
using server.Services;

namespace server.ResourceManagers
{
    public class EmailTemplateManager : IEmailTemplateManager
    {
        private readonly IStorage<EmailTemplate> _templateStorage;

        public EmailTemplateManager(IStorage<EmailTemplate> storage)
        {
            _templateStorage = storage;
        }

        public EmailTemplate GetTemplate(int id)
        {
            return _templateStorage.getItem(id);
        }
    }
}
