using GSecobat.Application.Employees;
using GSecobat.Application.Features.Employees.Responses;
using GSecobat.Domain.Entities;

namespace GSecobat.Application.Features.Employees.Services
{
    public class EmployeeService : IEmployeeService
    {
        private readonly IEmployeeRepository _employeeRepository;

        public EmployeeService(IEmployeeRepository employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }

        public async Task<EmployeeResponse> GetEmployeeById(int id)
        {
            Employee employee = await _employeeRepository.GetById(id);

            return employee.ToEmployeeResponse();
        }

        public async Task<List<EmployeeResponse>> GetEmployees()
        {
            List<Employee> employeesResult = await _employeeRepository.GetAllAsync();
            List<EmployeeResponse> result = employeesResult.Select(e => e.ToEmployeeResponse())
                                                    .ToList();

            return result;
        }
    }
}
