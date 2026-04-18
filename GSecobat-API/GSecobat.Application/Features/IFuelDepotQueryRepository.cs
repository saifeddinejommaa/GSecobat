using GSecobat.Application.Features.FuelDepots.Requests;
using GSecobat.Application.Features.FuelDepots.Responses;
using GSecobat.Domain.Entities;

namespace GSecobat.Application.Features
{
    public interface IFuelDepotQueryRepository
    {
        Task<List<FuelDepotsListResponse>> GetFuelDepotsList(FuelDepotRequestFilter filter);
    }
}
