namespace GSecobat.Application.Features.Assets.Requests
{
    public class AssetReffilsRequestFilter
    {
        public DateTime? ReffilDate { get; set; }
        public string? AssetSerialNumber { get; set; }
        public string? DepotName { get; set; }
        public int? FuelDepotTypeId { get; set; }
    }
}
