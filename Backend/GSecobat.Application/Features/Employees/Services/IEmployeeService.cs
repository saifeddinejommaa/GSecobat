using GSecobat.Application.Common;
using GSecobat.Application.Features.Employees.Requests;
using GSecobat.Application.Features.Employees.Responses;

namespace GSecobat.Application.Features.Employees.Services
{
    public interface IEmployeeService
    {
        Task<PagedResult<EmployeeResponse>> GetEmployees(EmployeesRequestFilter filter);

        Task<EmployeeResponse> GetEmployeeById(int id);
    }
}
