

using GSecobat.Domain.Entities;

namespace GSecobat.Application.Features.FuelDepots.Repositories
{
    public interface IFuelDepotRepository
    {
        public Task<FuelDepot> GetAsync(int id);

        public Task UpdateAsync(FuelDepot entity);
    }
}
