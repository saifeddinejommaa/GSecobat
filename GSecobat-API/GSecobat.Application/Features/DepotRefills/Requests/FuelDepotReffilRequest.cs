#nullable enable
using GSecobat.Application.Features.DepotReffils.Services;
using GSecobat.Application.Features.FuelDepots.Services;
using MediatR;

namespace GSecobat.Application.Features.DepotReffils.Requests
{
    public class FuelDepotReffilRequest : IRequest<bool>
    {
        public required int FuelDepotId { get; set; }

        public required DateTime Date { get; set; }

        public double Quantity { get; set; }

        public int UserId { get; set; }
    }

    public class DepotReffitRequestHandler : IRequestHandler<FuelDepotReffilRequest, bool>
    {
        private readonly IFuelDepotReffilService _depotReffilService;

        public DepotReffitRequestHandler(IFuelDepotReffilService depotReffilService)
        {
            _depotReffilService = depotReffilService;
        }
        public Task<bool> Handle(FuelDepotReffilRequest request, CancellationToken cancellationToken)
        {
            return _depotReffilService.ExecuteDepotReffil(request);
        }
    }
}
