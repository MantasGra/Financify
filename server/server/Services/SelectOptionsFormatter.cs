using System.Linq;
using server.DTO;
using Microsoft.EntityFrameworkCore;
using server.Models;

namespace server.Services
{
    public class SelectOptionsFormatter : ISelectOptionsFormatter
    {
        public IQueryable<SelectOptionDto> GetSelectOptions<T>(IQueryable<T> items, string property, string pattern) where T : Model
        {
            return items
                .Where(item => EF.Functions.Like(EF.Property<string>(item, property), $"%{pattern}%"))
                .Select(item => new SelectOptionDto
                {
                    Id = item.Id,
                    Label = EF.Property<string>(item, property)
                });
        }
    }
}
