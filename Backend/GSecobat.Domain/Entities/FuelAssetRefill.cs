using System.ComponentModel.DataAnnotations.Schema;

namespace GSecobat.Domain.Entities
{
    [Table("FuelAssetRefill")]
    public class FuelAssetRefill
    {
        public int Id { get; set; }
        public DateTime ReffilDate { get; set; }
        public int AssetId { get; set; }
        public int FuelDepotId { get; set; }
        public double Quantity { get; set; }
        public int IsFull { get; set; }
    }
}
