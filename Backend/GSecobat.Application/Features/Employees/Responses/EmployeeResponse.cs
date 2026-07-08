namespace GSecobat.Application.Features.Employees.Responses
{
    public class EmployeeResponse
    {
        public required int Id { get; set; }
        public required string FirstName { get; set; }
        public required string LastName { get; set; }
        public required DateOnly BirthDate { get; set; }
        public int Total { get; set; }
    }
}
