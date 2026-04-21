using GSecobat.Application.Features.FuelDepots.Repositories;
using GSecobat.Application.Features.FuelDepots.Requests;
using GSecobat.Application.Features.FuelDepots.Responses;

namespace GSecobat.Application.Features.FuelDepots.Services
{
    public class FuelDepotService : IFuelDepotService
    {
        private readonly IFuelDepotQueryRepository _queryRepository;
        public FuelDepotService(IFuelDepotQueryRepository queryRepository) 
        {
            _queryRepository = queryRepository;
        }
        public async Task<List<FuelDepotsListResponse>> GetFuelDepotsList(FuelDepotRequestFilter filter)
        {
            return await _queryRepository.GetFuelDepotsList(filter);
        }
    }
}
