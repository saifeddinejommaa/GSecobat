using GSecobat.Application.Features.Constants.Repositories;
using GSecobat.Application.Features.Constants.Responses;
using GSecobat.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace GSocobat.Infrastructure.Repositories
{
    public class ConstantsRepository : IConstantsRepository
    {
        private readonly GSecobatAppDbContext _context;

        public ConstantsRepository(GSecobatAppDbContext context)
        {
            _context = context;

        }
        public async Task<ConstantsResponse> GetConstants()
        {
            List<FuelDepotType> fuelDepotTypes = await _context.FuelDepotTypes
                                      .ToListAsync();
            List<AssetType> assetTypes = await _context.AssetTypes.ToListAsync();

            List<LocationType> locationTypes = await _context.LocationTypes.ToListAsync();

            List<AssetStatus> assetStatuses = await _context.AssetStatus.ToListAsync();

            return new ConstantsResponse
            {
                FuelDepotTypes = fuelDepotTypes
                        .Select(x => new ConstantResponse
                        {
                            Id = x.Id,
                            Label = x.Label
                        }).ToList(),

                AssetTypes = assetTypes
                        .Select(x => new ConstantResponse
                        {
                            Id = x.Id,
                            Label = x.TypeLabel
                        }).ToList(),

                LocationTypes = locationTypes
                        .Select(x => new ConstantResponse
                        {
                            Id = x.Id,
                            Label = x.Name
                        }).ToList(),

                AssetStatuses = assetStatuses
                        .Select(x => new ConstantResponse
                        {
                            Id = x.Id,
                            Label = x.StatusLabel
                        }).ToList()
                        };
        }
    }
}
