using GSecobat.Application.Common;
using GSecobat.Application.Employees;
using GSecobat.Application.Features.Employees.Requests;
using GSecobat.Application.Features.Employees.Responses;
using GSecobat.Domain.Entities;

namespace GSecobat.Application.Features.Employees.Services
{
    public class EmployeeService : IEmployeeService
    {
        private readonly IEmployeesQueryRepository _employeeQueryRepository;

        private readonly IEmployeeRepository _employeeRepository;


        public EmployeeService(IEmployeeRepository employeeRepository, IEmployeesQueryRepository employeeQueryRepository)
        {
            _employeeRepository = employeeRepository;
            _employeeQueryRepository = employeeQueryRepository;
        }

        public async Task<EmployeeResponse> GetEmployeeById(int id)
        {
            Employee? employee = await _employeeRepository.GetByIdAsync(id);

            return employee.ToEmployeeResponse();
        }

        public async Task<PagedResult<EmployeeResponse>> GetEmployees(EmployeesRequestFilter filter)
        {
            PagedResult<EmployeeResponse> employeesResult = await _employeeQueryRepository.GetAllEmployeesAsync(filter);
       
            return employeesResult;
        }
    }
}
