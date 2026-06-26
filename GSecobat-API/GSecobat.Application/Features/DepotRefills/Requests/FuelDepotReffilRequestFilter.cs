using GSecobat.Application.Common;

namespace GSecobat.Application.Features.DepotRefills.Requests
{
    public class FuelDepotReffilRequestFilter : PagedRequest
    {
        public int FuelDepotId { get; set; }
        public DateTime? ReffilDate { get; set; }
        public string? FuelDepotRef { get; set; }
    }
}
