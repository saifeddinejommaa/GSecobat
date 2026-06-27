using GSecobat.Application.Common;
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

        public async Task<bool> AddAsset(AddAssetRequest request)
        {
            Asset newAsset = new Asset
            {
                AssetTypeId = request.AssetTypeId,
                AssetStatusId = 1,
                CurrentFuelQuantity = 0,
                FiscalHorsepower = request.FiscalHorsepower,
                FuelCapacity = request.FuelCapacity,
                SerialNumber = request.SerialNumber
            };

            await _assetRepository.AddAsync(newAsset);

            return true;
        }

        public async Task<PagedResult<AssetForListResponse>> GetAllAssets(AssetsRequestFilter filter)
        {
            PagedResult<AssetForListResponse> assets = await _assetQueryRepository.GetAssets(filter);
            return assets;
        }

        public async Task<AssetForListResponse> GetAssetById(int assetId)
        {
            Asset asset = await _assetRepository.GetAssetById(assetId);

            return asset.ToAssetResponse();
        }

        public async Task<AssetForListResponse> GetAssetBySerialNumber(string serialNumber)
        {
            Asset asset = await _assetRepository.GetAssetBySerialNumber(serialNumber);

            return asset.ToAssetResponse();
        }

        public async Task<List<AssetForListResponse>> GetAssetsByType(int assetTypeId)
        {
            List<Asset> assets = await _assetRepository.GetAssetsByType(assetTypeId);

            List<AssetForListResponse> response = assets.Select(asset => asset.ToAssetResponse())
                                            .ToList();
            return response;
        }
    }
}
