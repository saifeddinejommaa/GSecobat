using System.ComponentModel.DataAnnotations.Schema;

namespace GSecobat.Domain.Entities
{
    [Table("MissionBusinessTrip")]
    public class MissionBusinessTrip
    {
        public int Id { get; set; }
        public int MissionId { get; set; }
        public int FromLocationId { get; set; }
        public int ToLocationId { get; set; }
        public double Distance { get; set; }
    }
}
