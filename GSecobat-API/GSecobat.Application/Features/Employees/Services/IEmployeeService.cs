using GSecobat.Application.Features.Employees.Responses;

namespace GSecobat.Application.Features.Employees.Services
{
    public interface IEmployeeService
    {
        Task<List<EmployeeResponse>> GetEmployees();

        Task<EmployeeResponse> GetEmployeeById(int id);

    }
}
