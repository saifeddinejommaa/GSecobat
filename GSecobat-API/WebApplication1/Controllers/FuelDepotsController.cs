using GSecobat.Application.Features.AssetRefills.Responses;
using GSecobat.Application.Features.Assets.Requests;
using GSecobat.Application.Features.DepotReffils.Requests;
using GSecobat.Application.Features.DepotReffils.Services;
using GSecobat.Application.Features.DepotRefills.Requests;
using GSecobat.Application.Features.DepotRefills.Responses;
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
    public class FuelDepotsController : ControllerBase
    {
        private readonly IFuelDepotService _fuelDepotService;
        private readonly IFuelDepotRefillService _fuelDepotRefillService;
        private readonly IMediator _mediator;

        public FuelDepotsController(IMediator mediator,
                        IFuelDepotService service,
                        IFuelDepotRefillService fuelDepotRefillService)
        {
            _fuelDepotService = service;
            _mediator = mediator;
            _fuelDepotRefillService = fuelDepotRefillService;
        }

        [HttpGet("all", Name = nameof(GetAllFuelDepots))]
        [ProducesResponseType(typeof(List<FuelDepotsListResponse>), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetAllFuelDepots([FromQuery] FuelDepotRequestFilter filter)
        {
            List<FuelDepotsListResponse> response = await _fuelDepotService.GetFuelDepotsList(filter);

            return Ok(response);
        }

        [HttpGet("all-reffils", Name = nameof(GetAllDepotReffils))]
        [ProducesResponseType(typeof(List<FuelDepotReffilResponse>), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetAllDepotReffils([FromQuery] FuelDepotReffilRequestFilter filter)
        {
            List<FuelDepotReffilResponse> response = await _fuelDepotRefillService.GetAllFuelDepotReffils(filter);

            return Ok(response);
        }

        [HttpPost("fuel-Refills")]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        public async Task<IActionResult> Reffil([FromBody] FuelDepotRefillRequest request)
        {
            return Ok(await _mediator.Send(request));
        }
    }
}
