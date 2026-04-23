using GSecobat.Application.Features.DepotReffils.Repositories;
using GSecobat.Application.Features.DepotReffils.Requests;
using GSecobat.Application.Features.FuelDepots.Repositories;
using GSecobat.Domain.Entities;
using GSecobat.Domain.Exceptions;

namespace GSecobat.Application.Features.DepotReffils.Services
{
    public class FuelDepotRefillService : IFuelDepotRefillService
    {
        private readonly IFuelDepotRefillRepository _depotReffilRepository;
        private readonly IFuelDepotRepository _fuelDepotRepository;

        public FuelDepotRefillService(IFuelDepotRefillRepository depotReffilRepository, IFuelDepotRepository fuelDepotRepository)
        {
            _depotReffilRepository = depotReffilRepository;
            _fuelDepotRepository = fuelDepotRepository;
        }

        public async Task<bool> ExecuteDepotReffil(FuelDepotRefillRequest request)
        {
            
            FuelDepot fuelDepot = Guard.AgainstNull(await _fuelDepotRepository
                                                            .GetByIdAsync(request.FuelDepotId)
                                                       , "Fuel depot not found");

            FuelDepotRefill newReffil = new()
            {
                FuelDepotId = request.FuelDepotId,
                Quantity = request.Quantity,
                ReffilDate = DateTime.UtcNow,
            };

            fuelDepot.CurrentLevel += request.Quantity;

            await _depotReffilRepository.AddAsync(newReffil);

            return true;
        }
    }
}
