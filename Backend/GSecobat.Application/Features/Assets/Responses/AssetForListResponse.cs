#nullable enable
using System.Text.Json.Serialization;

namespace GSecobat.Application.Features.Assets.Responses
{
    public class AssetForListResponse
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
        public double? CurrentFuelQuantity { get; set; }
        public double FuelCapacity { get; set; }
        public int Total { get; set; }
    }
}
