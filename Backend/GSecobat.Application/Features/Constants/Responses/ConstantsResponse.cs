namespace GSecobat.Application.Features.Constants.Responses
{
    public class ConstantsResponse
    {
        public required List<ConstantResponse> LocationTypes { get; set; }
        public required List<ConstantResponse> AssetStatuses { get; set; }
        public required List<ConstantResponse> AssetTypes { get; set; }
        public required List<ConstantResponse> FuelDepotTypes { get; set; }
    }
}
