using GSecobat.Application.Features.DepotReffils.Requests;

namespace GSecobat.Application.Features.DepotReffils.Services
{
    public interface IFuelDepotReffilService
    {
        public Task<bool> ExecuteDepotReffil(FuelDepotReffilRequest request);
    }
}
