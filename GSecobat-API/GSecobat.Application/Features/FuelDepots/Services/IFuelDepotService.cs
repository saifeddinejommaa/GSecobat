using GSecobat.Application.Features.FuelDepots.Requests;
using GSecobat.Application.Features.FuelDepots.Responses;

namespace GSecobat.Application.Features.FuelDepots.Services
{
    public interface IFuelDepotService
    {
        public Task<List<FuelDepotsListResponse>> GetFuelDepotsList(FuelDepotRequestFilter filter);
    }
}
