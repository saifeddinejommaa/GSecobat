

using GSecobat.Application.Features.AssetRefills.Responses;
using GSecobat.Application.Features.Assets.Requests;

namespace GSecobat.Application.Features.AssetRefills.Repositories
{
    public interface IFuelAssetReffilQueryRepository
    {
        public Task<List<AssetReffilResponse>> GetAllAssetReffils(AssetReffilsRequestFilter request);
    }
}
