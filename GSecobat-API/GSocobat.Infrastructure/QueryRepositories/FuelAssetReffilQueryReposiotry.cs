using Dapper;
using GSecobat.Application.Common;
using GSecobat.Application.Features.AssetRefills.Repositories;
using GSecobat.Application.Features.AssetRefills.Responses;
using GSecobat.Application.Features.Assets.Requests;
using System.Data;
using System.Text;

namespace GSocobat.Infrastructure.QueryRepositoryes
{
    public class FuelAssetReffilQueryRepository : IFuelAssetReffilQueryRepository
    {
        private readonly IDbConnection _dbConnection;

        public FuelAssetReffilQueryRepository(IDbConnection dbConnection)
        {
            _dbConnection = dbConnection;
        }

        public async Task<PagedResult<AssetReffilResponse>> GetAllAssetReffils(AssetReffilsRequestFilter request)
        {
            StringBuilder sql = new(
            $"""
            SELECT
                COUNT(*) OVER() AS {nameof(AssetReffilResponse.Total)},
                fa."Id" {nameof(AssetReffilResponse.Id)},
                fa."ReffilDate" {nameof(AssetReffilResponse.ReffilDate)},
                fa."Quantity" {nameof(AssetReffilResponse.Quantity)},
                fa."IsFull" {nameof(AssetReffilResponse.IsFull)},
                a."SerialNumber" {nameof(AssetReffilResponse.AssetSerialNumber)},
                fd."DepotName" {nameof(AssetReffilResponse.DepotName)}
            FROM "FuelAssetRefill" fa
                INNER JOIN "Asset" a ON fa."AssetId" = a."Id"
                INNER JOIN "FuelDepot" fd ON fa."FuelDepotId" = fd."Id"
            WHERE 1=1
            """);

            var parameters = new DynamicParameters();
            parameters.Add("PageSize", request.PageSize);
            parameters.Add("Offset", (request.PageNumber - 1) * request.PageSize);

            if (!string.IsNullOrWhiteSpace(request.AssetSerialNumber))
            {
                sql.Append(@" AND a.""SerialNumber"" ILIKE @SerialNumber ");
                parameters.Add("SerialNumber", $"%{request.AssetSerialNumber}%");
            }

            if (!string.IsNullOrWhiteSpace(request.DepotName))
            {
                sql.Append(@" AND fd.""DepotName"" ILIKE @DepotName ");
                parameters.Add("DepotName", $"%{request.DepotName}%");
            }

            if (request.ReffilDate.HasValue)
            {
                sql.Append(@" AND fa.""ReffilDate""::date = @ReffilDate ");
                parameters.Add("ReffilDate", request.ReffilDate.Value.Date);
            }

            if (request.FuelDepotTypeId.HasValue)
            {
                sql.Append(@" AND fd.""FuelDepotTypeId"" = @FuelDepotType ");
                parameters.Add("FuelDepotType", request.FuelDepotTypeId.Value);
            }

            sql.Append(
                """
                 ORDER BY a."Id"
                LIMIT @PageSize OFFSET @Offset
                """);

            var result = await _dbConnection.QueryAsync<AssetReffilResponse>(
                sql.ToString(),
                parameters
            );

            int total = result.Any() ? result.ElementAt(0).Total : 0;

            return new PagedResult<AssetReffilResponse>
            {
                PageNumber = request.PageNumber,
                PageSize = request.PageSize,
                TotalCount = total,
                Items = result.ToList()
            };
        }
    }
}