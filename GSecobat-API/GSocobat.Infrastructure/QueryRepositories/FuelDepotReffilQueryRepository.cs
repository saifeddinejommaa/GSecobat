using Dapper;
using GSecobat.Application.Features.DepotRefills.Repositories;
using GSecobat.Application.Features.DepotRefills.Requests;
using GSecobat.Application.Features.DepotRefills.Responses;
using GSecobat.Application.Features.FuelDepots.Responses;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GSocobat.Infrastructure.QueryRepositories
{
    public class FuelDepotReffilQueryRepository : IFuelDepotReffilQueryRepository
    {
        private readonly IDbConnection _dbConnection;

        public FuelDepotReffilQueryRepository(IDbConnection dbContext)
        {
            _dbConnection = dbContext;
        }

        public async Task<List<FuelDepotReffilResponse>> GetAllDepotReffils(FuelDepotReffilRequestFilter filter)
        {
            StringBuilder sql = new(
             $"""
            SELECT 
                fdr."Id" {nameof(FuelDepotReffilResponse.Id)},
                fdr."Quantity" {nameof(FuelDepotReffilResponse.Quantity)},
                fdr."ReffilDate" {nameof(FuelDepotReffilResponse.ReffilDate)},
                fd."DepotName" {nameof(FuelDepotReffilResponse.FuelDepotName)},
                fd."Reference" {nameof(FuelDepotReffilResponse.FuelDepotRef)}
            FROM "FuelDepotRefill" fdr
            INNER JOIN "FuelDepot" fd ON fdr."FuelDepotId" = fd."Id"
            """);

            var parameters = new DynamicParameters();

            if (filter.FuelDepotId > 0)
            {
                sql.Append(@" AND fdr.""FuelDepotId"" = @FuelDepotId ");
                parameters.Add("FuelDepotId", filter.FuelDepotId);
            }

            if (filter.ReffilDate.HasValue)
            {
                sql.Append(@" AND DATE(fdr.""ReffilDate"") = @ReffilDate ");
                parameters.Add("ReffilDate", filter.ReffilDate.Value.Date);
            }

            if (!string.IsNullOrWhiteSpace(filter.FuelDepotRef))
            {
                sql.Append(@" AND fd.""Reference"" ILIKE @FuelDepotRef ");
                parameters.Add("FuelDepotRef", $"%{filter.FuelDepotRef}%");
            }

            var result = await _dbConnection.QueryAsync<FuelDepotReffilResponse>(
                sql.ToString(),
                parameters
            );

            return result.ToList();
        }
    }
}
