using GSecobat.Application.Features.Assets.Responses;
using GSecobat.Domain.Entities;


namespace GSecobat.Application.Features.Assets.Services
{
    public class AssetService : IAssetService
    {
        private readonly IAssetRepository _assetRepository;
        public AssetService(IAssetRepository assetRepository)
        {
            _assetRepository = assetRepository;
        }
        public async Task<List<AssetResponse>> GetAllAssets()
        {
            List<Asset> assets = await _assetRepository.GetAllAssets();

            List<AssetResponse> response = assets.Select(asset => asset.ToAssetResponse())
                                             .ToList();
            return response;
        }

        public async Task<AssetResponse> GetAssetById(int assetId)
        {
            Asset asset = await _assetRepository.GetAssetById(assetId);

            return asset.ToAssetResponse();
        }

        public async Task<AssetResponse> GetAssetBySerialNumber(string serialNumber)
        {
            Asset asset = await _assetRepository.GetAssetBySerialNumber(serialNumber);

            return asset.ToAssetResponse();
        }

        public async Task<List<AssetResponse>> GetAssetsByType(int assetTypeId)
        {
            List<Asset> assets = await _assetRepository.GetAssetsByType(assetTypeId);

            List<AssetResponse> response = assets.Select(asset => asset.ToAssetResponse())
                                            .ToList();
            return response;
        }
    }
}
