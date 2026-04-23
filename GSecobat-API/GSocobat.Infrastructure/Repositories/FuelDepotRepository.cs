using GSecobat.Application.Features.FuelDepots.Repositories;
using GSecobat.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace GSocobat.Infrastructure.Repositories
{
    public class FuelDepotRepository(GSecobatAppDbContext context) : IFuelDepotRepository
    {
        private readonly GSecobatAppDbContext _context = context;

        public Task AddAsync(FuelDepot entity)
        {
            throw new NotImplementedException();
        }

        public Task DeleteAsync(FuelDepot entity)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<FuelDepot>> GetAllAsync()
        {
            throw new NotImplementedException();
        }

        public async Task<FuelDepot?> GetByIdAsync(int id)
        {
            return await _context.FuelDepots.Where(depot => depot.Id == id)
                                        .FirstOrDefaultAsync();
        }

        public async Task UpdateAsync(FuelDepot entity)
        {
            _context.Update(entity);
            await _context.SaveChangesAsync();
        }
    }
}
