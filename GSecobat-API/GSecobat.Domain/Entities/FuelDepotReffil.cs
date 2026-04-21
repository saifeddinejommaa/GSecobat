using System.ComponentModel.DataAnnotations.Schema;

namespace GSecobat.Domain.Entities
{
    [Table("FuelDepotReffil")]
    public class FuelDepotReffil
    {
        public int Id { get; set; }

        public int FuelDepotsId { get; set; }

        public DateTime ReffilDate { get; set; }

        public double QuantityLiters { get; set; }

    }
}
