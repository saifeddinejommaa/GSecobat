using GSecobat.Domain.Entities;

namespace GSecobat.Application.Features.Employees
{
    public interface IEmployeeRepository
    {
        Task<Employee> GetById(int id);

        Task<List<Employee>> GetAllAsync();
    }
}
