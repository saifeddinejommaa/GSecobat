using System.ComponentModel.DataAnnotations.Schema;

namespace GSecobat.Domain.Entities
{
    [Table("MissionConstructionSite")]
    public class MissionConstructionSite
    {
        public int Id { get; set; }
        public int MissionId { get; set; }
        public double Hours { get; set; }
        public int LocationId { get; set; }
    }
}
