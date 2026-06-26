using GSecobat.Application.Features.Site;
using GSecobat.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace GSocobat.Infrastructure.Repositories
{
    public class LocationRepository : ILocationRepository
    {
        private readonly GSecobatAppDbContext _context;

        public LocationRepository(GSecobatAppDbContext context)
        {
            _context = context;
        }

        public Task AddAsync(Location entity)
        {
            throw new NotImplementedException();
        }

        public Task DeleteAsync(Location entity)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<Location>> GetAllAsync()
        {
            return await _context.Locations.ToListAsync();
        }

        public Task<Location?> GetByIdAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task UpdateAsync(Location entity)
        {
            throw new NotImplementedException();
        }
    }
}
