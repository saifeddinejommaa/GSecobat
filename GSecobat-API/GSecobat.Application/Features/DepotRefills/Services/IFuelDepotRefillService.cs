using GSecobat.Application.Features.DepotReffils.Requests;

namespace GSecobat.Application.Features.DepotReffils.Services
{
    public interface IFuelDepotRefillService
    {
        public Task<bool> ExecuteDepotReffil(FuelDepotRefillRequest request);
    }
}
