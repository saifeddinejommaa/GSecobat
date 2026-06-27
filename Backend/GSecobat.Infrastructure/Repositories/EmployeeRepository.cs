using GSecobat.Application.Common;
using GSecobat.Application.Features.Employees;
using GSecobat.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace GSocobat.Infrastructure.Repositories
{
    public class EmployeeRepository(GSecobatAppDbContext context) : IEmployeeRepository
    {
        private readonly GSecobatAppDbContext _context = context;

        public Task AddAsync(Employee entity)
        {
            throw new NotImplementedException();
        }

        public Task DeleteAsync(Employee entity)
        {
            throw new NotImplementedException();
        }

        public async Task<Employee?> GetByIdAsync(int id)
        {
            return await _context.Employees.Where(emp => emp.Id == id)
                                     .FirstAsync();
        }

        public Task UpdateAsync(Employee entity)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<Employee>> GetAllAsync()
        {
            return await _context.Employees.ToListAsync();
        }
    }
}
