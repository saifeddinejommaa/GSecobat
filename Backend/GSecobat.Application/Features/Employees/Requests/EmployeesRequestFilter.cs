using GSecobat.Application.Common;

namespace GSecobat.Application.Features.Employees.Requests
{
    public class EmployeesRequestFilter : PagedRequest
    {
        public int? EmployeeId { get; set; }
        public string? EmployeeName { get; set; }
    }
}
