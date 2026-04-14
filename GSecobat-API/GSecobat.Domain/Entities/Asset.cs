#nullable enable
using System.ComponentModel.DataAnnotations.Schema;

namespace GSecobat.Domain.Entities
{
    [Table("Asset")]
    public class Asset
    {
        public int Id { get; set; }
        public string? SerialNumber { get; set; }
        public int AssetTypeId { get; set; }
        public int AssetStatusId { get; set; }
        public DateOnly? PurchaseDate { get; set; }
        public int? FiscalHorsepower { get; set; }
        public AssetType? AssetType { get; set; }
    }
}
