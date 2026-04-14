using GSecobat.Domain.Entities;

namespace GSecobat.Application.Features.Assets
{
    public interface IAssetRepository
    {
        Task<List<Asset>> GetAllAssets();

        Task<Asset> GetAssetById(int id);

        Task<Asset> GetAssetBySerialNumber(string serialNumber);

        Task<List<Asset>> GetAssetsByType(int assetTypeId);
    }
}
