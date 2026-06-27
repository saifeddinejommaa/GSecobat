using GSecobat.Application.Common;

namespace GSecobat.Application.Features.Assets.Requests
{
    public class AssetReffilsRequestFilter : PagedRequest
    {
        public DateTime? ReffilDate { get; set; }
        public string? AssetSerialNumber { get; set; }
        public string? DepotName { get; set; }
        public int? FuelDepotTypeId { get; set; }
    }
}
