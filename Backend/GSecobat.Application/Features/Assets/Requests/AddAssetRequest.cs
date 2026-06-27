using FluentValidation;
using GSecobat.Application.Features.Assets.Services;
using MediatR;

namespace GSecobat.Application.Features.Assets.Requests
{
    public class AddAssetRequest : IRequest<bool>
    {
        public string SerialNumber { get; set; }
        public int AssetTypeId { get; set; }
        public DateOnly? PurchaseDate { get; set; }
        public int? FiscalHorsepower { get; set; }
        public double FuelCapacity { get; set; }
    }

    public class AddAssetRequestValidator : AbstractValidator<AddAssetRequest>
    {
        public AddAssetRequestValidator()
        {
        }
    }

    public class AddAssetRequestHandler : IRequestHandler<AddAssetRequest, bool>
    {
        private readonly IAssetService _assetService;

        public AddAssetRequestHandler(IAssetService fuelAssetReffilService)
        {
            _assetService = fuelAssetReffilService;
        }

        public async Task<bool> Handle(AddAssetRequest request, CancellationToken cancellationToken)
        {
            return await _assetService.AddAsset(request);
        }
    }

}
