using GSecobat.Application.Features.DepotReffils.Repositories;
using GSecobat.Application.Features.DepotReffils.Requests;
using GSecobat.Application.Features.FuelDepots.Repositories;
using GSecobat.Domain.Entities;

namespace GSecobat.Application.Features.DepotReffils.Services
{
    public class FuelDepotReffilService : IFuelDepotReffilService
    {
        private readonly IFuelDepotReffilRepository _depotReffilRepository;
        private readonly IFuelDepotRepository _fuelDepotRepository;

        public FuelDepotReffilService(IFuelDepotReffilRepository depotReffilRepository, IFuelDepotRepository fuelDepotRepository)
        {
            _depotReffilRepository = depotReffilRepository;
            _fuelDepotRepository = fuelDepotRepository;
        }

        public async Task<bool> ExecuteDepotReffil(FuelDepotReffilRequest request)
        {
            FuelDepot? fuelDepot = await _fuelDepotRepository.GetByIdAsync(request.FuelDepotId);

            FuelDepotReffil newReffil = new()
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
