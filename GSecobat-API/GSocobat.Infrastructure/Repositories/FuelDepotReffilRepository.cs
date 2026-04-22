using GSecobat.Application.Features.DepotReffils.Repositories;
using GSecobat.Domain.Entities;

namespace GSocobat.Infrastructure.Repositories
{
    public class FuelDepotReffilRepository : IFuelDepotReffilRepository
    {
        private readonly GSecobatAppDbContext _context;

        public FuelDepotReffilRepository(GSecobatAppDbContext context)
        {
            _context = context;
        }

        public async Task AddAsync(FuelDepotReffil entity)
        {
            await _context.DepotReffils.AddAsync(entity);
            await _context.SaveChangesAsync();
        }

        public Task DeleteAsync(FuelDepotReffil entity)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<FuelDepotReffil>> GetAllAsync()
        {
            throw new NotImplementedException();
        }

        public Task<FuelDepotReffil?> GetByIdAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task UpdateAsync(FuelDepotReffil entity)
        {
            throw new NotImplementedException();
        }
    }
}