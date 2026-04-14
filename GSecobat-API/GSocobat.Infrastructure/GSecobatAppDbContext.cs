using GSecobat.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace GSocobat.Infrastructure
{
    public class GSecobatAppDbContext : DbContext
    {
        public GSecobatAppDbContext(DbContextOptions<GSecobatAppDbContext> options)
        : base(options)
        {
        }

        public DbSet<Employee> Employees { get; set; }
        public DbSet<Asset> Assets { get; set; }
        public DbSet<AssetType> AssetTypes { get; set; }
    }
}
