namespace GSecobat.Application.Features.Assets.Requests
{
    public class AssetsRequestFilter
    {
        public int? AssetType { get; set; }
        public int? AssetStatus { get; set; }
        public string? SerialNumber { get; set; }
        public int? StatusType { get; set; }
        public string? Mch { get; set; }
    }
}
