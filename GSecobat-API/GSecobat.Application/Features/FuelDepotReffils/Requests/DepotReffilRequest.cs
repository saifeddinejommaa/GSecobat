#nullable enable
using GSecobat.Application.Features.DepotReffils.Services;
using GSecobat.Application.Features.FuelDepots.Services;
using MediatR;

namespace GSecobat.Application.Features.DepotReffils.Requests
{
    public class DepotReffilRequest : IRequest<bool>
    {
        public required int FuelDepotId { get; set; }

        public required DateTime Date { get; set; }

        public double Quantity { get; set; }

        public int UserId { get; set; }
    }

    public class DepotReffitRequestHandler : IRequestHandler<DepotReffilRequest, bool>
    {
        private readonly IDepotReffilService _depotReffilService;

        public DepotReffitRequestHandler(IDepotReffilService depotReffilService)
        {
            _depotReffilService = depotReffilService;
        }
        public Task<bool> Handle(DepotReffilRequest request, CancellationToken cancellationToken)
        {
            return _depotReffilService.ExecuteDepotReffil(request);
        }
    }
}
