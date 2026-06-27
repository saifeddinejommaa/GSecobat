using GSecobat.Application.Features.Employees.Responses;
using GSecobat.Application.Features.Employees.Services;
using Microsoft.AspNetCore.Mvc;

namespace GSecobat.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeesController : ControllerBase
    {
        IEmployeeService _employeeService;
        public EmployeesController(IEmployeeService employeeService)
        {
            _employeeService = employeeService;
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetAllEmployees()
        {
            List<EmployeeResponse> response = await _employeeService.GetEmployees();

            return Ok(response);
        }

        [HttpGet("{employeeId:int}/details")]
        public async Task<IActionResult> GetEmployeeById(int employeeId)
        {
            EmployeeResponse response = await _employeeService.GetEmployeeById(employeeId);

            return Ok(response);
        }
    }
}
