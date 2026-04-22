using GSecobat.Application.Features.AssetReffil.Repositories;
using GSecobat.Domain.Entities;

namespace GSocobat.Infrastructure.Repositories
{
    public class FuelAssetReffilRepository(GSecobatAppDbContext context) : IFuelAssetReffilRepository
    {
        private readonly GSecobatAppDbContext _context = context;

        public async Task AddAsync(FuelAssetReffil entity)
        {
            await _context.FuelAssetReffils.AddAsync(entity);
            await _context.SaveChangesAsync();
        }

        public Task DeleteAsync(FuelAssetReffil entity)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<FuelAssetReffil>> GetAllAsync()
        {
            throw new NotImplementedException();
        }

        public Task<FuelAssetReffil?> GetByIdAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task UpdateAsync(FuelAssetReffil entity)
        {
            throw new NotImplementedException();
        }
    }
}
