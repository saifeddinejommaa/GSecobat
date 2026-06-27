using System.ComponentModel.DataAnnotations.Schema;

namespace GSecobat.Domain.Entities
{
    [Table("AssetStatus")]
    public class AssetStatus
    {
        public int Id { get; set; }
        public required string StatusLabel { get; set; }
    }
}