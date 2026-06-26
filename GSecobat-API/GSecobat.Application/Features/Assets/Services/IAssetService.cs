using GSecobat.Application.Common;
using GSecobat.Application.Features.Assets.Requests;
using GSecobat.Application.Features.Assets.Responses;

namespace GSecobat.Application.Features.Assets.Services
{
    public interface IAssetService
    {
        Task<PagedResult<AssetForListResponse>> GetAllAssets(AssetsRequestFilter filter);

        Task<List<AssetForListResponse>> GetAssetsByType(int typeId);

        Task<AssetForListResponse> GetAssetBySerialNumber(string serialNumber);

        Task<AssetForListResponse> GetAssetById(int assetId);

        Task<bool> AddAsset(AddAssetRequest request);
    }
}
