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
        public DbSet<LocationType> LocationTypes { get; set; }
        public DbSet<AssetStatus> AssetStatus { get; set; }
        public DbSet<FuelDepotType> FuelDepotTypes { get; set; }
        public DbSet<Location> Locations { get; set; }
        public DbSet<FuelDepot> FuelDepots { get; set; }
        public DbSet<FuelDepotRefill> DepotReffils { get; set; }
        public DbSet<FuelAssetRefill> FuelAssetReffils { get; set; }

    }
}
