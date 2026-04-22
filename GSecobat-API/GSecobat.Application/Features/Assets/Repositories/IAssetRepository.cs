using GSecobat.Application.Common;
using GSecobat.Domain.Entities;

namespace GSecobat.Application.Features.Assets.Repositories
{
    public interface IAssetRepository : IBaseRepository<Asset>
    {
        Task<Asset> GetAssetById(int id);

        Task<Asset> GetAssetBySerialNumber(string serialNumber);

        Task<List<Asset>> GetAssetsByType(int assetTypeId);
    }
}
