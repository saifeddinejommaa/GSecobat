#nullable enable
using FluentValidation;
using GSecobat.Application.Features.DepotReffils.Services;
using MediatR;

namespace GSecobat.Application.Features.DepotReffils.Requests
{
    public class FuelDepotRefillRequest : IRequest<bool>
    {
        public required int FuelDepotId { get; set; }

        public required DateTime Date { get; set; }

        public double Quantity { get; set; }
    }

    public class FuelDepotRefillFiltersValidator : AbstractValidator<FuelDepotRefillRequest>
    {
        public FuelDepotRefillFiltersValidator()
        {
            RuleFor(x => x.FuelDepotId).GreaterThan(0);
            RuleFor(x => x.Quantity).GreaterThan(0);
        }
    }

    public class DepotReffitRequestHandler : IRequestHandler<FuelDepotRefillRequest, bool>
    {
        private readonly IFuelDepotRefillService _depotReffilService;

        public DepotReffitRequestHandler(IFuelDepotRefillService depotReffilService)
        {
            _depotReffilService = depotReffilService;
        }
        public Task<bool> Handle(FuelDepotRefillRequest request, CancellationToken cancellationToken)
        {
            return _depotReffilService.ExecuteDepotReffil(request);
        }
    }
}
