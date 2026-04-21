using GSecobat.Application.Features.DepotReffils.Repositories;
using GSecobat.Domain.Entities;

namespace GSocobat.Infrastructure.Repositories
{
    public class DepotReffitRepository : IDepotReffilRepository
    {
        private readonly GSecobatAppDbContext _context;

        public DepotReffitRepository(GSecobatAppDbContext context)
        {
            _context = context;
        }

        public async Task SaveChanges(FuelDepotReffil entity)
        {
            await _context.DepotReffils.AddAsync(entity);
           await _context.SaveChangesAsync();
        }
    }
}