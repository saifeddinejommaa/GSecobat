using GSecobat.Application.Common;
using GSecobat.Application.Features.DepotReffils.Requests;
using GSecobat.Application.Features.DepotRefills.Requests;
using GSecobat.Application.Features.DepotRefills.Responses;

namespace GSecobat.Application.Features.DepotReffils.Services
{
    public interface IFuelDepotRefillService
    {
        public Task<PagedResult<FuelDepotReffilResponse>> GetAllFuelDepotReffils(FuelDepotReffilRequestFilter filter);

        public Task<bool> ExecuteDepotReffil(FuelDepotRefillRequest request);
    }
}
