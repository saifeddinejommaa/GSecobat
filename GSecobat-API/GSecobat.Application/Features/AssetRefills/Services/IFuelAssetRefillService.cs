using GSecobat.Application.Features.AssetReffil.Requests;

namespace GSecobat.Application.Features.AssetReffil.Services
{
    public interface IFuelAssetRefillService
    {
        public Task<bool> ExecuteFuellAssetReffil(FuelAssetReffilRequest request);
    }
}
