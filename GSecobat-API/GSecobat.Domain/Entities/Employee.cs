#nullable enable
using System.ComponentModel.DataAnnotations.Schema;

namespace GSecobat.Domain.Entities
{
    [Table("Employee")]
    public class Employee
    {
        public required int Id { get; set; }
        public required string FirstName { get; set; }
        public required string LastName { get; set; }
        public required DateOnly BirthDate { get; set; }
    }
}
