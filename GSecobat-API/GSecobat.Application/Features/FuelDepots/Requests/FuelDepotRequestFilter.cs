using GSecobat.Application.Common;

namespace GSecobat.Application.Features.FuelDepots.Requests
{
    public class FuelDepotRequestFilter: PagedRequest
    {
        public string? Reference { get; set; }

        public int? TypeId { get; set; }

        public int? LocationId { get; set; }

        public string? Name { get; set; }
    }
}
