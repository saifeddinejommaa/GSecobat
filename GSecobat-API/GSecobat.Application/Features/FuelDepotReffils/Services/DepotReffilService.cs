using GSecobat.Application.Features.DepotReffils.Repositories;
using GSecobat.Application.Features.DepotReffils.Requests;
using GSecobat.Application.Features.FuelDepots.Repositories;
using GSecobat.Application.Features.FuelDepots.Services;
using GSecobat.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GSecobat.Application.Features.DepotReffils.Services
{
    public class DepotReffilService : IDepotReffilService
    {
        private readonly IDepotReffilRepository _depotReffilRepository;
        private readonly IFuelDepotRepository _fuelDepotRepository;
        public DepotReffilService(IDepotReffilRepository depotReffilRepository, IFuelDepotRepository fuelDepotRepository)
        {
            _depotReffilRepository = depotReffilRepository;
            _fuelDepotRepository = fuelDepotRepository;
        }

        public async Task<bool> ExecuteDepotReffil(DepotReffilRequest request)
        {
            FuelDepot fuelDepot = await _fuelDepotRepository.GetAsync(request.FuelDepotId);

            FuelDepotReffil newReffil = new()
            {
                FuelDepotsId = request.FuelDepotId,
                QuantityLiters = request.Quantity,
                ReffilDate = DateTime.UtcNow,
            };

             await _depotReffilRepository.SaveChanges(newReffil);

            fuelDepot.Capacity = fuelDepot.CurrentLevel + request.Quantity;

            await _fuelDepotRepository.UpdateAsync(fuelDepot);

            return true;

            
        }
    }
}
