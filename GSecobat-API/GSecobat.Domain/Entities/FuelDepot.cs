using System.ComponentModel.DataAnnotations.Schema;

namespace GSecobat.Domain.Entities
{
    [Table("FuelDepot")]
    public class FuelDepot
    {
        public int Id { get; set; }

        public int TypeId { get; set; }

        public int LocationId { get; set; }

        public string? DepotName { get; set; }

        public double Capacity { get; set; }

        public double CurrentLevel { get; set; }

        public string Reference { get; set; } = null!;

    }
}
