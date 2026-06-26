using Dapper;
using GSecobat.Application.Common;
using GSecobat.Application.Features.DepotRefills.Repositories;
using GSecobat.Application.Features.DepotRefills.Requests;
using GSecobat.Application.Features.DepotRefills.Responses;
using System.Data;
using System.Text;

namespace GSocobat.Infrastructure.QueryRepositories
{
    public class FuelDepotReffilQueryRepository : IFuelDepotReffilQueryRepository
    {
        private readonly IDbConnection _dbConnection;

        public FuelDepotReffilQueryRepository(IDbConnection dbContext)
        {
            _dbConnection = dbContext;
        }

        public async Task<PagedResult<FuelDepotReffilResponse>> GetAllDepotReffils(FuelDepotReffilRequestFilter filter)
        {
            StringBuilder sql = new(
                $"""
                SELECT
                    COUNT(*) OVER() {nameof(FuelDepotReffilResponse.Total)},
                    fdr."Id" {nameof(FuelDepotReffilResponse.Id)},
                    fdr."Quantity" {nameof(FuelDepotReffilResponse.Quantity)},
                    fdr."ReffilDate" {nameof(FuelDepotReffilResponse.ReffilDate)},
                    fd."DepotName" {nameof(FuelDepotReffilResponse.FuelDepotName)},
                    fd."Reference" {nameof(FuelDepotReffilResponse.FuelDepotRef)}
                FROM "FuelDepotRefill" fdr
                INNER JOIN "FuelDepot" fd ON fdr."FuelDepotId" = fd."Id"
                WHERE 1=1
                """);

            var parameters = new DynamicParameters();
            parameters.Add("PageSize", filter.PageSize);
            parameters.Add("Offset", (filter.PageNumber - 1) * filter.PageSize);

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

            sql.Append(
                """
                 ORDER BY fdr."Id"
                LIMIT @PageSize OFFSET @Offset
                """);

            var result = await _dbConnection.QueryAsync<FuelDepotReffilResponse>(
                sql.ToString(),
                parameters
            );

            int total = result.Any() ? result.ElementAt(0).Total : 0;

            return new PagedResult<FuelDepotReffilResponse>
            {
                PageNumber = filter.PageNumber,
                PageSize = filter.PageSize,
                TotalCount = total,
                Items = result.ToList()
            };
        }
    }
}
