using GSecobat.Application.Features.Assets.Repositories;
using GSecobat.Application.Features.Assets.Requests;
using GSecobat.Application.Features.Assets.Responses;
using GSecobat.Domain.Entities;

namespace GSecobat.Application.Features.Assets.Services
{
    public class AssetService : IAssetService
    {
        private readonly IAssetRepository _assetRepository;
        private readonly IAssetQueryRepository _assetQueryRepository;
        public AssetService(IAssetRepository assetRepository, IAssetQueryRepository assetQueryRepository)
        {
            _assetRepository = assetRepository;
            _assetQueryRepository = assetQueryRepository;
        }
        public async Task<List<AssetResponse>> GetAllAssets(AssetsRequestFilter filter)
        {
            List<AssetResponse> assets = await _assetQueryRepository.GetAssets(filter);
            return assets;
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
