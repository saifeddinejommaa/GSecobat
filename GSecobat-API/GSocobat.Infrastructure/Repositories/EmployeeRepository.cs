using GSecobat.Application.Features.Employees;
using GSecobat.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace GSocobat.Infrastructure.Repositories
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly GSecobatAppDbContext _context;

        public EmployeeRepository(GSecobatAppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Employee>> GetAllAsync()
        {
            return await _context.Employees.ToListAsync();
        }

        public async Task<Employee> GetById(int id)
        {
            return await _context.Employees.Where(emp => emp.Id == id)
                                    .FirstAsync();
        }
    }
}
