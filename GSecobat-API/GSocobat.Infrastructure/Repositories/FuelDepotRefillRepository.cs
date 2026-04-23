using GSecobat.Application.Features.DepotReffils.Repositories;
using GSecobat.Domain.Entities;

namespace GSocobat.Infrastructure.Repositories
{
    public class FuelDepotRefillRepository : IFuelDepotRefillRepository
    {
        private readonly GSecobatAppDbContext _context;

        public FuelDepotRefillRepository(GSecobatAppDbContext context)
        {
            _context = context;
        }

        public async Task AddAsync(FuelDepotRefill entity)
        {
            await _context.DepotReffils.AddAsync(entity);
            await _context.SaveChangesAsync();
        }

        public Task DeleteAsync(FuelDepotRefill entity)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<FuelDepotRefill>> GetAllAsync()
        {
            throw new NotImplementedException();
        }

        public Task<FuelDepotRefill?> GetByIdAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task UpdateAsync(FuelDepotRefill entity)
        {
            throw new NotImplementedException();
        }
    }
}