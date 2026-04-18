using Dapper;
using GSecobat.Application.Features;
using GSecobat.Application.Features.Assets.Responses;
using GSecobat.Application.Features.FuelDepots.Requests;
using GSecobat.Application.Features.FuelDepots.Responses;
using GSecobat.Domain.Entities;
using System.Data;
using System.Text;

namespace GSecobat.Infrastructure.QueryRepositories
{
    public class FuelDepotQueryRepository :IFuelDepotQueryRepository
    {
        private readonly IDbConnection _dbConnection;

        public FuelDepotQueryRepository(IDbConnection dbConnection)
        {
            _dbConnection = dbConnection;
        }

        public async Task<List<FuelDepotsListResponse>> GetFuelDepotsList(FuelDepotRequestFilter filter)
        {
            StringBuilder sql = new(
            $"""
            SELECT 
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
            """);
            var parameters = new DynamicParameters();

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

            using var connection = _dbConnection;

            var result = await connection.QueryAsync<FuelDepotsListResponse>(
                sql.ToString(),
                parameters
            );

            return result.ToList();
        }
    }
}