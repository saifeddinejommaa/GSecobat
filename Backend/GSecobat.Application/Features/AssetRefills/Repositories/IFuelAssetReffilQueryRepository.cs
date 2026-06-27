

using GSecobat.Application.Common;
using GSecobat.Application.Features.AssetRefills.Responses;
using GSecobat.Application.Features.Assets.Requests;

namespace GSecobat.Application.Features.AssetRefills.Repositories
{
    public interface IFuelAssetReffilQueryRepository
    {
        public Task<PagedResult<AssetReffilResponse>> GetAllAssetReffils(AssetReffilsRequestFilter request);
    }
}
