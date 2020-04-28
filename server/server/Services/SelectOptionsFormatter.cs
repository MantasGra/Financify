using System.Linq;
using server.Models;
using server.DTO;
using Microsoft.EntityFrameworkCore;

namespace server.Services
{
    public class SelectOptionsFormatter : ISelectOptionsFormatter
    {
        public IQueryable<SelectOptionDto> GetAccountSelectOptions(IQueryable<Account> items, string pattern)
        {
            return items
                .Where(i => EF.Functions.Like(i.Name, $"%{pattern}%"))
                .Select(i => new SelectOptionDto
                {
                    Id = i.Id,
                    Name = i.Name
                });
        }
    }
}
