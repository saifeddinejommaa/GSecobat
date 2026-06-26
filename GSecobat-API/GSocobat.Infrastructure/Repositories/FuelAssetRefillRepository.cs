using GSecobat.Application.Features.AssetReffil.Repositories;
using GSecobat.Domain.Entities;

namespace GSocobat.Infrastructure.Repositories
{
    public class FuelAssetRefillRepository(GSecobatAppDbContext context) : IFuelAssetReffilRepository
    {
        private readonly GSecobatAppDbContext _context = context;

        public async Task AddAsync(FuelAssetRefill entity)
        {
            await _context.FuelAssetReffils.AddAsync(entity);
            await _context.SaveChangesAsync();
        }

        public Task DeleteAsync(FuelAssetRefill entity)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<FuelAssetRefill>> GetAllAsync()
        {
            throw new NotImplementedException();
        }

        public Task<FuelAssetRefill?> GetByIdAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task UpdateAsync(FuelAssetRefill entity)
        {
            throw new NotImplementedException();
        }
    }
}
