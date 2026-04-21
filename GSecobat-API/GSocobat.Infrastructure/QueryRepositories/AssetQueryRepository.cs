using Dapper;
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

        public async Task<List<AssetResponse>> GetAssets(AssetsRequestFilter filter)
        {
            StringBuilder sql = new(
                $"""
                 SELECT 
                    a."Id" {nameof(AssetResponse.Id)},
                    a."SerialNumber" {nameof(AssetResponse.SerialNumber)},
                    a."AssetTypeId" {nameof(AssetResponse.AssetTypeId)},
                    a."AssetStatusId" {nameof(AssetResponse.AssetStatusId)},
                    a."CurrentFuelQuantity" {nameof(AssetResponse.CurrentFuelQuantity)},
                    a."FiscalHorsepower" {nameof(AssetResponse.FiscalHorsepower)},
                    t."TypeLabel" {nameof(AssetResponse.TypeLabel)},
                    s."StatusLabel" {nameof(AssetResponse.AssetStatusLabel)}
                FROM public."Asset" a
                INNER JOIN public."AssetType" t ON a."AssetTypeId" = t."Id"
                INNER JOIN public."AssetStatus" s ON a."AssetStatusId" = s."Id"
                """);

            var parameters = new DynamicParameters();

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
                sql.Append(@" AND a.""SerialNumber"" = @SerialNumber");
                parameters.Add("SerialNumber", filter.SerialNumber);
            }

            if (filter.StatusType.HasValue)
            {
                sql.Append(@" AND s.""StatusType"" = @StatusType");
                parameters.Add("StatusType", filter.StatusType);
            }

            if (!string.IsNullOrWhiteSpace(filter.Mch))
            {
                sql.Append(@" AND a.""Mch"" = @Mch");
                parameters.Add("Mch", filter.Mch);
            }

            using var connection = _dbConnection;

            var result = await connection.QueryAsync<AssetResponse>(
                sql.ToString(),
                parameters
            );

            return result.ToList();
        }
    }
}
