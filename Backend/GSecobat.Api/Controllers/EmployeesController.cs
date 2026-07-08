using GSecobat.Application.Common;
using GSecobat.Application.Features.Employees.Requests;
using GSecobat.Application.Features.Employees.Responses;
using GSecobat.Application.Features.Employees.Services;
using GSecobat.Application.Features.Missions.Requests;
using Microsoft.AspNetCore.Mvc;
using System.Net;

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
        [ProducesResponseType(typeof(List<EmployeeResponse>), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetAllEmployees([FromQuery] EmployeesRequestFilter filter)
        {
            PagedResult<EmployeeResponse> response = await _employeeService.GetEmployees(filter);

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
