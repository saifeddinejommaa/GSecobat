using System.ComponentModel.DataAnnotations.Schema;

namespace GSecobat.Domain.Entities
{
    [Table("LocationType")]
    public class LocationType
    {
        public int Id { get; set; }

        public required string Name { get; set; }
    }
}
