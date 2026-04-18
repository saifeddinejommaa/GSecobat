using GSecobat.Application.Features.Assets.Requests;
using GSecobat.Application.Features.Assets.Responses;
using GSecobat.Application.Features.Assets.Services;
using GSecobat.Application.Features.FuelDepots.Requests;
using GSecobat.Application.Features.FuelDepots.Responses;
using GSecobat.Application.Features.FuelDepots.Services;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace GSecobat.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FuelDepotController : ControllerBase
    {
        IFuelDepotService _fuelDepotService;
        public FuelDepotController(IFuelDepotService service)
        {
            _fuelDepotService = service;
        }

        [HttpGet("GetAll", Name = nameof(GetAllFuelDepots))]
        [ProducesResponseType(typeof(List<FuelDepotsListResponse>), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetAllFuelDepots([FromQuery] FuelDepotRequestFilter filter)
        {
            List<FuelDepotsListResponse> response = await _fuelDepotService.GetFuelDepotsList(filter);

            return Ok(response);
        }
    }
}
