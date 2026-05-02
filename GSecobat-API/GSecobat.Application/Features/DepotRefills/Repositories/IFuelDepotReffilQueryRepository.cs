using GSecobat.Application.Features.DepotRefills.Requests;
using GSecobat.Application.Features.DepotRefills.Responses;

namespace GSecobat.Application.Features.DepotRefills.Repositories
{
    public interface IFuelDepotReffilQueryRepository
    {
        public Task<List<FuelDepotReffilResponse>> GetAllDepotReffils(FuelDepotReffilRequestFilter filter);
    }
}
