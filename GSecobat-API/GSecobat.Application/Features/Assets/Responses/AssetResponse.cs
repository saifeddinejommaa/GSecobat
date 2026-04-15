#nullable enable
namespace GSecobat.Application.Features.Assets.Responses
{
    public class AssetResponse
    {
        public required int Id { get; set; }
        public string? SerialNumber { get; set; }
        public required int AssetTypeId { get; set; }
        public required int AssetStatusId { get; set; }
        public DateOnly? PurchaseDate { get; set; }
        public int? FiscalHorsepower { get; set; }
        public string? TypeLabel { get; set; }
        public string? Mch { get; set; }
        public string? AssetStatusLabel { get; set; }
    }
}
