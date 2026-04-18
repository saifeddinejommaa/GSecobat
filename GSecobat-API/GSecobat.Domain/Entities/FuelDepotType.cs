using System.ComponentModel.DataAnnotations.Schema;

namespace GSecobat.Domain.Entities
{
    [Table("FuelDepotType")]
    public class FuelDepotType
    {
        public int Id { get; set; }
        public int Label { get; set; }
    }
}
