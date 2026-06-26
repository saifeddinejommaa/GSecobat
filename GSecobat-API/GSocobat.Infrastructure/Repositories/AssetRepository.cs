using GSecobat.Application.Features.Assets.Repositories;
using GSecobat.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace GSocobat.Infrastructure.Repositories
{
    public class AssetRepository(GSecobatAppDbContext context) : IAssetRepository
    {
        private readonly GSecobatAppDbContext _context = context;

        public async Task AddAsync(Asset entity)
        {
            await _context.Assets.AddAsync(entity);
            await _context.SaveChangesAsync();
        }

        public Task DeleteAsync(Asset entity)
        {
            throw new NotImplementedException();
        }

        public async Task<List<Asset>> GetAllAssets()
        {
            List<Asset> assets = await _context.Assets.ToListAsync();

            return assets;
        }

        public Task<IEnumerable<Asset>> GetAllAsync()
        {
            throw new NotImplementedException();
        }

        public async Task<Asset> GetAssetById(int id)
        {
            Asset asset = await _context.Assets.Where(asset => asset.Id == id)
                                                .FirstAsync();

            return asset;
        }

        public async Task<Asset> GetAssetBySerialNumber(string serialNumber)
        {
            Asset asset = await _context.Assets.Where(asset => asset.SerialNumber == serialNumber)
                                            .FirstAsync();
            return asset;
        }

        public async Task<List<Asset>> GetAssetsByType(int assetTypeId)
        {
            List<Asset> assets = await _context.Assets.Where(asset => asset.AssetTypeId == assetTypeId)
                                                    .ToListAsync();

            return assets;
        }

        public Task<Asset?> GetByIdAsync(int id)
        {
            throw new NotImplementedException();
        }

        public async Task UpdateAsync(Asset entity)
        {
            _context.Update(entity);
            await _context.SaveChangesAsync();
        }
    }
}
