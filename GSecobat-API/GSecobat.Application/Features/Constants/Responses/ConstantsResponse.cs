namespace GSecobat.Application.Features.Constants.Responses
{
    public class ConstantsResponse
    {
        public required List<ConstantResponse> LocationType { get; set; }
        public required List<ConstantResponse> AssetStatuses { get; set; }
        public required List<ConstantResponse> AssetTypes { get; set; }
        public required List<ConstantResponse> FuelDepotTypes { get; set; }
    }
}
