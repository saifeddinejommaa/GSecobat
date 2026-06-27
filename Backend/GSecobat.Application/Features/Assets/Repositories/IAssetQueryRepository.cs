using GSecobat.Application.Common;
using GSecobat.Application.Features.Assets.Requests;
using GSecobat.Application.Features.Assets.Responses;

namespace GSecobat.Application.Features.Assets.Repositories
{
    public interface IAssetQueryRepository
    {
        Task<PagedResult<AssetForListResponse>> GetAssets(AssetsRequestFilter request);
    }
}
