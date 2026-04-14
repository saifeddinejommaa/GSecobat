#nullable enable
using System.ComponentModel.DataAnnotations.Schema;

namespace GSecobat.Domain.Entities
{
    [Table("AssetType")]
    public class AssetType
    {
        public int Id { get; set; }

        public string? Mch { get; set; }

        public string TypeLabel { get; set; } = null!;
    }
}
