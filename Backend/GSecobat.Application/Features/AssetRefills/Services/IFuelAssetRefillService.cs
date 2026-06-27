using GSecobat.Application.Common;
using GSecobat.Application.Features.AssetReffil.Requests;
using GSecobat.Application.Features.AssetRefills.Responses;
using GSecobat.Application.Features.Assets.Requests;
using GSecobat.Domain.Entities;

namespace GSecobat.Application.Features.AssetReffil.Services
{
    public interface IFuelAssetRefillService
    {
        public Task<bool> ExecuteFuellAssetReffil(FuelAssetReffilRequest request);

        public Task<PagedResult<AssetReffilResponse>> GetAllAssetRefills(AssetReffilsRequestFilter request);
    }
}
