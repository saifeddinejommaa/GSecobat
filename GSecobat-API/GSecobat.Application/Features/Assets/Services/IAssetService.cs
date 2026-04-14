using GSecobat.Application.Features.Assets.Responses;

namespace GSecobat.Application.Features.Assets.Services
{
    public interface IAssetService
    {
        Task<List<AssetResponse>> GetAllAssets();

        Task<List<AssetResponse>> GetAssetsByType(int typeId);

        Task<AssetResponse> GetAssetBySerialNumber(string serialNumber);

        Task<AssetResponse> GetAssetById(int assetId);
    }
}
