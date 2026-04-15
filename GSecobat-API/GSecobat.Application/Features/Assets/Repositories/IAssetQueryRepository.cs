using GSecobat.Application.Features.Assets.Requests;
using GSecobat.Application.Features.Assets.Responses;

namespace GSecobat.Application.Features.Assets.Repositories
{
    public interface IAssetQueryRepository
    {
        Task<List<AssetResponse>> GetAssets(AssetsRequestFilter request);
    }
}
