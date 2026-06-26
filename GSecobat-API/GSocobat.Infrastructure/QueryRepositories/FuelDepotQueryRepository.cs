using Dapper;
using GSecobat.Application.Common;
using GSecobat.Application.Features.FuelDepots.Repositories;
using GSecobat.Application.Features.FuelDepots.Requests;
using GSecobat.Application.Features.FuelDepots.Responses;
using System.Data;
using System.Text;

namespace GSecobat.Infrastructure.QueryRepositories
{
    public class FuelDepotQueryRepository : IFuelDepotQueryRepository
    {
        private readonly IDbConnection _dbConnection;

        public FuelDepotQueryRepository(IDbConnection dbConnection)
        {
            _dbConnection = dbConnection;
        }

        public async Task<PagedResult<FuelDepotsListResponse>> GetFuelDepotsList(FuelDepotRequestFilter filter)
        {
            StringBuilder sql = new(
            $"""
            SELECT
                COUNT(*) OVER() {nameof(FuelDepotsListResponse.Total)},
                a."Id" {nameof(FuelDepotsListResponse.Id)},
                a."Reference" {nameof(FuelDepotsListResponse.Reference)},
                a."CurrentLevel" {nameof(FuelDepotsListResponse.CurrentLevel)},
                a."Capacity" {nameof(FuelDepotsListResponse.Capacity)},
                a."DepotName" {nameof(FuelDepotsListResponse.DepotName)},
                t."Label" {nameof(FuelDepotsListResponse.Type)},
                l."Address" {nameof(FuelDepotsListResponse.LocationAddress)}
            FROM "FuelDepot" a
            INNER JOIN "FuelDepotType" t on t."Id" = a."TypeId"
            INNER JOIN "Location" l on l."Id" = a."LocationId"
            WHERE 1=1
            """);
            var parameters = new DynamicParameters();
            parameters.Add("PageSize", filter.PageSize);
            parameters.Add("Offset", (filter.PageNumber - 1) * filter.PageSize);

            if (!string.IsNullOrWhiteSpace(filter.Reference))
            {
                sql.Append(@" AND a.""Reference"" ILIKE @Reference ");
                parameters.Add("Reference", $"%{filter.Reference}%");
            }

            if (filter.TypeId.HasValue)
            {
                sql.Append(@" AND a.""TypeId"" = @TypeId ");
                parameters.Add("TypeId", filter.TypeId.Value);
            }

            if (filter.LocationId.HasValue)
            {
                sql.Append(@" AND a.""LocationId"" = @LocationId ");
                parameters.Add("LocationId", filter.LocationId.Value);
            }

            if (!string.IsNullOrWhiteSpace(filter.Name))
            {
                sql.Append(@" AND a.""DepotName"" ILIKE @Name ");
                parameters.Add("Name", $"%{filter.Name}%");
            }

            sql.Append(
                """
                 ORDER BY a."Id"
                LIMIT @PageSize OFFSET @Offset
                """);

            var result = await _dbConnection.QueryAsync<FuelDepotsListResponse>(
                sql.ToString(),
                parameters
            );

            int total = result.Any() ? result.ElementAt(0).Total : 0;

            return new PagedResult<FuelDepotsListResponse>
            {
                PageNumber = filter.PageNumber,
                PageSize = filter.PageSize,
                TotalCount = total,
                Items = result.ToList()
            };
        }
    }
}