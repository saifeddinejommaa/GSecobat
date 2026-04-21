using GSecobat.Application.Features.FuelAssetReffil.Requests;

namespace GSecobat.Application.Features.FuelAssetReffil.Services
{
    public interface IFuelAssetReffilService
    {
        public Task<bool> ExecuteFuellAssetReffil(FuelAssetReffilRequest request);
    }
}
