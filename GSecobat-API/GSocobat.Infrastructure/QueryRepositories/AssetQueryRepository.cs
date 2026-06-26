using Dapper;
using GSecobat.Application.Common;
using GSecobat.Application.Features.Assets.Repositories;
using GSecobat.Application.Features.Assets.Requests;
using GSecobat.Application.Features.Assets.Responses;
using System.Data;
using System.Text;

namespace GSocobat.Infrastructure.QueryRepositoryes
{
    public class AssetQueryRepository : IAssetQueryRepository
    {
        private readonly IDbConnection _dbConnection;

        public AssetQueryRepository(IDbConnection dbConnection)
        {
            _dbConnection = dbConnection;
        }

        public async Task<PagedResult<AssetForListResponse>> GetAssets(AssetsRequestFilter filter)
        {
            StringBuilder sql = new(
                $"""
                 SELECT
                    COUNT(*) OVER() AS {nameof(AssetForListResponse.Total)},
                    a."Id" {nameof(AssetForListResponse.Id)},
                    a."SerialNumber" {nameof(AssetForListResponse.SerialNumber)},
                    a."AssetTypeId" {nameof(AssetForListResponse.AssetTypeId)},
                    a."AssetStatusId" {nameof(AssetForListResponse.AssetStatusId)},
                    a."CurrentFuelQuantity" {nameof(AssetForListResponse.CurrentFuelQuantity)},
                    a."FiscalHorsepower" {nameof(AssetForListResponse.FiscalHorsepower)},
                    t."TypeLabel" {nameof(AssetForListResponse.TypeLabel)},
                    s."StatusLabel" {nameof(AssetForListResponse.AssetStatusLabel)}
                FROM public."Asset" a
                INNER JOIN public."AssetType" t ON a."AssetTypeId" = t."Id"
                INNER JOIN public."AssetStatus" s ON a."AssetStatusId" = s."Id"
                WHERE 1=1
                """);

            var parameters = new DynamicParameters();
            parameters.Add("PageSize", filter.PageSize);
            parameters.Add("Offset", (filter.PageNumber - 1) * filter.PageSize);

            if (filter.AssetType.HasValue)
            {
                sql.Append(@" AND a.""AssetTypeId"" = @AssetType");
                parameters.Add("AssetType", filter.AssetType);
            }

            if (filter.AssetStatus.HasValue)
            {
                sql.Append(@" AND a.""AssetStatusId"" = @AssetStatus");
                parameters.Add("AssetStatus", filter.AssetStatus);
            }

            if (!string.IsNullOrWhiteSpace(filter.SerialNumber))
            {
                sql.Append(@" AND a.""SerialNumber"" ILIKE @SerialNumber");
                parameters.Add("SerialNumber", $"%{filter.SerialNumber}%");
            }

            if (filter.StatusType.HasValue)
            {
                sql.Append(@" AND s.""StatusType"" = @StatusType");
                parameters.Add("StatusType", filter.StatusType);
            }

            if (!string.IsNullOrWhiteSpace(filter.Mch))
            {
                sql.Append(@" AND a.""Mch"" ILIKE @Mch");
                parameters.Add("Mch", $"%{filter.Mch}%");
            }

            sql.Append(
                """
                 ORDER BY a."Id"
                LIMIT @PageSize OFFSET @Offset
                """);

            using var connection = _dbConnection;

            var result = await connection.QueryAsync<AssetForListResponse>(
                sql.ToString(),
                parameters
            );

            int total = result.Any() ? result.ElementAt(0).Total : 0;

            return new PagedResult<AssetForListResponse>
            {
                PageNumber = filter.PageNumber,
                PageSize = filter.PageSize,
                TotalCount = total,
                Items = result.ToList()
            };
        }
    }
}
