using GSecobat.Application.Common;
using GSecobat.Application.Features.DepotReffils.Repositories;
using GSecobat.Application.Features.DepotReffils.Requests;
using GSecobat.Application.Features.DepotRefills.Repositories;
using GSecobat.Application.Features.DepotRefills.Requests;
using GSecobat.Application.Features.DepotRefills.Responses;
using GSecobat.Application.Features.FuelDepots.Repositories;
using GSecobat.Domain.Entities;
using GSecobat.Domain.Exceptions;
using System.ComponentModel;

namespace GSecobat.Application.Features.DepotReffils.Services
{
    public class FuelDepotRefillService : IFuelDepotRefillService
    {
        private readonly IFuelDepotRefillRepository _depotReffilRepository;
        private readonly IFuelDepotReffilQueryRepository _depotReffilQueryRepository;
        private readonly IFuelDepotRepository _fuelDepotRepository;

        public FuelDepotRefillService(IFuelDepotRefillRepository depotReffilRepository,
                    IFuelDepotRepository fuelDepotRepository,
                    IFuelDepotReffilQueryRepository fuelDepotReffilQueryRepository)
        {
            _depotReffilRepository = depotReffilRepository;
            _fuelDepotRepository = fuelDepotRepository;
            _depotReffilQueryRepository = fuelDepotReffilQueryRepository;
        }

        public async Task<PagedResult<FuelDepotReffilResponse>> GetAllFuelDepotReffils(FuelDepotReffilRequestFilter filter)
        {
            return await _depotReffilQueryRepository.GetAllDepotReffils(filter);
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
                ReffilDate = request.Date,
            };

            fuelDepot.CurrentLevel += request.Quantity;

            await _depotReffilRepository.AddAsync(newReffil);

            return true;
        }
    }
}
