using GSecobat.Application.Features.Assets.Repositories;
using GSecobat.Application.Features.FuelAssetReffil.Repositories;
using GSecobat.Application.Features.FuelAssetReffil.Requests;
using GSecobat.Domain.Entities;

namespace GSecobat.Application.Features.FuelAssetReffil.Services
{
    public class FuelServiceReffilService : IFuelAssetReffilService
    {
        private readonly IFuelAssetReffilRepository _fuelAssetReffitRepository;
        private readonly IAssetRepository _assetRepository;

        public FuelServiceReffilService(IFuelAssetReffilRepository fuelAssetReffilRepository, IAssetRepository assetRepository)
        {
            _assetRepository = assetRepository;
            _fuelAssetReffitRepository = fuelAssetReffilRepository;
        }
        public async Task<bool> ExecuteFuellAssetReffil(FuelAssetReffilRequest request)
        {
            Domain.Entities.FuelAssetReffil newReffil = new()
            {
                AssetId = request.AssetId,
                FuelDepotId = request.FuelDepotId,
                Quantity = request.Quantity,
                ReffilDate = DateTime.UtcNow,
                IsFull = request.IsFull ? 1 : 0,
                UserId = request.UserId,
            };
            await _fuelAssetReffitRepository.SaveChanges(newReffil);

            Asset assetToReffil = await _assetRepository.GetAssetById(request.AssetId);

            if (request.IsFull)
            {
                assetToReffil.CurrentFuelQuantity = request.Quantity;
            }
            else
            {
                assetToReffil.CurrentFuelQuantity = assetToReffil.CurrentFuelQuantity + request.Quantity;
            }

            await _assetRepository.UpdateAsync(assetToReffil);

            return true;

        }
    }
}
