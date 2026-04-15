using GSecobat.Application.Features.Assets.Requests;
using GSecobat.Application.Features.Assets.Responses;

namespace GSecobat.Application.Features.Assets.Services
{
    public interface IAssetService
    {
        Task<List<AssetResponse>> GetAllAssets(AssetsRequestFilter filter);

        Task<List<AssetResponse>> GetAssetsByType(int typeId);

        Task<AssetResponse> GetAssetBySerialNumber(string serialNumber);

        Task<AssetResponse> GetAssetById(int assetId);
    }
}
