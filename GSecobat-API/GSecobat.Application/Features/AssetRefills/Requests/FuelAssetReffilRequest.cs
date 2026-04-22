using GSecobat.Application.Features.AssetReffil.Services;
using MediatR;

namespace GSecobat.Application.Features.AssetReffil.Requests
{
    public class FuelAssetReffilRequest : IRequest<bool>
    {
        public DateTime? ReffilDate { get; set; }
        public required int AssetId { get; set; }
        public required int FuelDepotId { get; set; }
        public  required int UserId { get; set; }
        public required double Quantity { get; set; }
        public required bool IsFull { get; set; }
    }

    public class FuelAssetReffitRequestHandler : IRequestHandler<FuelAssetReffilRequest, bool>
    {
        private readonly IFuelAssetRefillService _fuelAssetReffilService;

        public FuelAssetReffitRequestHandler(IFuelAssetRefillService fuelAssetReffilService)
        {
            _fuelAssetReffilService = fuelAssetReffilService;
        }
        public async Task<bool> Handle(FuelAssetReffilRequest request, CancellationToken cancellationToken)
        {
            return await _fuelAssetReffilService.ExecuteFuellAssetReffil(request);
        }
    }
}
