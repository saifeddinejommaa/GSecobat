using GSecobat.Application.Common;
using GSecobat.Application.Features.FuelDepots.Requests;
using GSecobat.Application.Features.FuelDepots.Responses;

namespace GSecobat.Application.Features.FuelDepots.Repositories
{
    public interface IFuelDepotQueryRepository
    {
        Task<PagedResult<FuelDepotsListResponse>> GetFuelDepotsList(FuelDepotRequestFilter filter);
    }
}
