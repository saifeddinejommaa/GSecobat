using GSecobat.Application.Features.Assets.Repositories;
using GSecobat.Application.Features.AssetReffil.Repositories;
using GSecobat.Application.Features.AssetReffil.Requests;
using GSecobat.Domain.Entities;
using GSecobat.Application.Features.FuelDepots.Repositories;

namespace GSecobat.Application.Features.AssetReffil.Services
{
    public class FuelAssetRefillService : IFuelAssetRefillService
    {
        private readonly IFuelAssetReffilRepository _fuelAssetReffitRepository;
        private readonly IFuelDepotRepository _fuelDepotRepository;
        private readonly IAssetRepository _assetRepository;

        public FuelAssetRefillService(IFuelAssetReffilRepository fuelAssetReffilRepository, 
                    IAssetRepository assetRepository,
                    IFuelDepotRepository fuelDepotRepository)
        {
            _assetRepository = assetRepository;
            _fuelAssetReffitRepository = fuelAssetReffilRepository;
            _fuelDepotRepository = fuelDepotRepository;
        }
        public async Task<bool> ExecuteFuellAssetReffil(FuelAssetReffilRequest request)
        {
            FuelAssetReffil newReffil = new()
            {
                AssetId = request.AssetId,
                FuelDepotId = request.FuelDepotId,
                Quantity = request.Quantity,
                ReffilDate = DateTime.UtcNow,
                IsFull = request.IsFull ? 1 : 0,
                UserId = request.UserId,
            };

            Asset assetReffil = await _assetRepository.GetAssetById(request.AssetId);
            if (request.IsFull)
            {
                assetReffil.CurrentFuelQuantity = request.Quantity;
            }
            else
            {
                assetReffil.CurrentFuelQuantity += request.Quantity;
            }

            FuelDepot? fuelDepot = await _fuelDepotRepository.GetByIdAsync(request.FuelDepotId);
            fuelDepot.CurrentLevel -= request.Quantity;

            await _fuelAssetReffitRepository.AddAsync(newReffil);

            return true;
        }
    }
}
