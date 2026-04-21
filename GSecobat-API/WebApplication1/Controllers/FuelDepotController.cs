using GSecobat.Application.Features.DepotReffils.Requests;
using GSecobat.Application.Features.FuelDepots.Requests;
using GSecobat.Application.Features.FuelDepots.Responses;
using GSecobat.Application.Features.FuelDepots.Services;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace GSecobat.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FuelDepotController : ControllerBase
    {
        private readonly IFuelDepotService _fuelDepotService;
        private readonly IMediator _mediator;

        public FuelDepotController(IMediator mediator, IFuelDepotService service)
        {
            _fuelDepotService = service;
            _mediator = mediator;
        }

        [HttpGet("GetAll", Name = nameof(GetAllFuelDepots))]
        [ProducesResponseType(typeof(List<FuelDepotsListResponse>), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetAllFuelDepots([FromQuery] FuelDepotRequestFilter filter)
        {
            List<FuelDepotsListResponse> response = await _fuelDepotService.GetFuelDepotsList(filter);

            return Ok(response);
        }

        [HttpPost("Reffil")]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        public async Task<IActionResult> Reffil([FromBody] DepotReffilRequest request)
        {
            return Ok(await _mediator.Send(request));
        }
    }
}
