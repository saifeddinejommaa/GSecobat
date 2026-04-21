using GSecobat.Application.Features.FuelDepots.Repositories;
using GSecobat.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace GSocobat.Infrastructure.Repositories
{
    public class FuelDepotRepository : IFuelDepotRepository
    {
        private readonly GSecobatAppDbContext _context;

        public FuelDepotRepository(GSecobatAppDbContext context)
        {
            _context = context;
        }

        public async Task<FuelDepot> GetAsync(int id)
        {
           return await _context.FuelDepots.Where(depot => depot.Id == id)
                                     .FirstAsync();
        }

        public async Task UpdateAsync(FuelDepot entity)
        {
            _context.Update(entity);
            await _context.SaveChangesAsync();
        }
    }
}
