using Dapper;
using GSecobat.Application.Features.FuelDepots.Responses;
using GSecobat.Application.Features.Missions.Repositories;
using GSecobat.Application.Features.Missions.Requests;
using GSecobat.Application.Features.Missions.Responses;
using System.Data;
using System.Text;

namespace GSocobat.Infrastructure.QueryRepositories
{
    public class MissionsQueryRepository : IMissionsQueryRepository
    {
        private readonly IDbConnection _dbConnection;

        public MissionsQueryRepository(IDbConnection dbConnection)
        {
            _dbConnection = dbConnection;
        }
        public async Task<List<MissionResponse>> GetAllMissionsAsync(MissionsRequestFilter filter)
        {
            StringBuilder sql = new(
           $"""
            SELECT 
                m."Id" {nameof(MissionResponse.Id)},
                m."MissionTypeId" {nameof(MissionResponse.MissionTypeId)},
                m."MissionTitle" {nameof(MissionResponse.MissionTitle)},
                m."MissionDesc" {nameof(MissionResponse.MissionDesc)},
                m."StartDate" {nameof(MissionResponse.StartDate)},
                m."EndDate" {nameof(MissionResponse.EndDate)},
                mbt."Distance" {nameof(MissionResponse.Distance)},
                fl."Address" {nameof(MissionResponse.FromAddress)},
                tl."Address" {nameof(MissionResponse.ToAddress)},
                ml."Address" {nameof(MissionResponse.ConstructionSiteAddress)},
                e."FirstName" {nameof(MissionResponse.EmployeeName)}
            FROM "Mission" m
                INNER JOIN "Employee" e ON e."Id" = m."EmployeeId"
                LEFT JOIN "MissionBusinessTrip" mbt ON mbt."MissionId" = m."Id"
                LEFT JOIN "MissionConstructionSite" mcs ON mcs."MissionId" = m."Id"
                LEFT JOIN "Location" fl ON mbt."FromLocationId" = fl."Id"
                LEFT JOIN "Location" tl ON mbt."ToLocationId" = tl."Id"
                LEFT JOIN "Location" ml ON mcs."LocationId" = ml."Id";
            """);

            var parameters = new DynamicParameters();

            if (filter.MissionTypeId > 0)
            {
                sql.Append(@" AND m.""MissionTypeId"" = @MissionTypeId");
                parameters.Add("MissionTypeId", filter.MissionTypeId);
            }

            if (!string.IsNullOrWhiteSpace(filter.EmployeeName))
            {
                sql.Append(@" AND e.""FirstName"" ILIKE @EmployeeName");
                parameters.Add("EmployeeName", $"%{filter.EmployeeName}%");
            }

            if (!string.IsNullOrWhiteSpace(filter.MissionLocation))
            {
                sql.Append(@"
                        LEFT JOIN ""MissionBusinessTrip"" mbt 
                        ON mbt.""MissionId"" = m.""Id""
                        LEFT JOIN ""Location"" l 
                        ON l.""Id"" = mbt.""FromLocationId""
                ");

                sql.Append(@" AND l.""Address"" ILIKE @Location");
                parameters.Add("Location", $"%{filter.MissionLocation}%");
            }

            var result = await _dbConnection.QueryAsync<MissionResponse>(
                sql.ToString(),
                parameters
            );

            return result.ToList();
        }
    }
}
