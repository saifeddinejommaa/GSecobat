using System.ComponentModel.DataAnnotations.Schema;

namespace GSecobat.Domain.Entities
{
    [Table("Mission")]
    public class Mission
    {
        public int Id { get; set; }
        public int EmployeeId { get; set; }
        public int MissionTypeId { get; set; }
        public required string MissionTitle { get; set; }
        public string? MissionDesc { get; set; }
    }
}
