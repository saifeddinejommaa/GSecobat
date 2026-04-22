using System.ComponentModel.DataAnnotations.Schema;

namespace GSecobat.Domain.Entities
{
    [Table("FuelDepotReffil")]
    public class FuelDepotReffil
    {
        public int Id { get; set; }

        public int FuelDepotId { get; set; }

        public DateTime ReffilDate { get; set; }

        public double Quantity { get; set; }
    }
}
