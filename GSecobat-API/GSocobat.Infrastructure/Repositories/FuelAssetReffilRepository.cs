using GSecobat.Application.Features.FuelAssetReffil.Repositories;
using GSecobat.Domain.Entities;

namespace GSocobat.Infrastructure.Repositories
{
    public class FuelAssetReffilRepository : IFuelAssetReffilRepository
    {
        private readonly GSecobatAppDbContext _context;

        public FuelAssetReffilRepository(GSecobatAppDbContext context)
        {
            _context = context;
        }

        public async Task SaveChanges(FuelAssetReffil entity)
        {
            await _context.FuelAssetReffils.AddAsync(entity);
            await _context.SaveChangesAsync();
        }
    }
}
