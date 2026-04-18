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

        public async Task<List<Location>> GetAllAddress()
        {
            return await _context.Locations.ToListAsync();
        }
    }
}
