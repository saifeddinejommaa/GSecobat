#nullable enable
using System.ComponentModel.DataAnnotations.Schema;

namespace GSecobat.Domain.Entities
{
    [Table("Location")]
    public class Location
    {
        public  int Id { get; set; }
        public required string Address { get; set; }

        public string City { get; set; }
    }
}