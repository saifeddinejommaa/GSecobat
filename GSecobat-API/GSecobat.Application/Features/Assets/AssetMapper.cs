using GSecobat.Application.Features.Assets.Responses;
using GSecobat.Domain.Entities;
using Riok.Mapperly.Abstractions;

namespace GSecobat.Application.Features.Assets
{
    [Mapper(RequiredMappingStrategy = RequiredMappingStrategy.Source)]
    public static partial class AssetMapper
    {
        public static partial AssetResponse ToAssetResponse(this Asset Asset);
    }
}
