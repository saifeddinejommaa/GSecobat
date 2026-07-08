using Dapper;
using GSecobat.Application.Common;
using GSecobat.Application.Features.Employees.Requests;
using GSecobat.Application.Features.Employees.Responses;
using System.Data;
using System.Text;

namespace GSocobat.Infrastructure.QueryRepositories
{
    public class EmployeesQueryRepository : IEmployeesQueryRepository
    {
        private readonly IDbConnection _dbConnection;

        public EmployeesQueryRepository(IDbConnection dbConnection)
        {
            _dbConnection = dbConnection;
        }

        public async Task<PagedResult<EmployeeResponse>> GetAllEmployeesAsync(EmployeesRequestFilter filter)
        {
            StringBuilder sql = new(
           $"""
            SELECT "Id", "FirstName", "LastName", "BirthDate"
            FROM public."Employee"
            WHERE 1=1
            """);

            var parameters = new DynamicParameters();
            parameters.Add("PageSize", filter.PageSize);
            parameters.Add("Offset", (filter.PageNumber - 1) * filter.PageSize);

            if (filter.EmployeeId > 0)
            {
                sql.Append(@" AND m.""Id"" = @Id");
                parameters.Add("Id", filter.EmployeeId);
            }

            if (!string.IsNullOrWhiteSpace(filter.EmployeeName))
            {
                sql.Append(@" AND e.""FirstName"" ILIKE @EmployeeName");
                parameters.Add("EmployeeName", $"%{filter.EmployeeName}%");
            }

            sql.Append(
                """
                 ORDER BY m."Id"
                LIMIT @PageSize OFFSET @Offset
                """);

            var result = await _dbConnection.QueryAsync<EmployeeResponse>(
                sql.ToString(),
                parameters
            );

            int total = result.Any() ? result.ElementAt(0).Total : 0;

            return new PagedResult<EmployeeResponse>
            {
                PageNumber = filter.PageNumber,
                PageSize = filter.PageSize,
                TotalCount = total,
                Items = result.ToList()
            };
        }
    }
}
