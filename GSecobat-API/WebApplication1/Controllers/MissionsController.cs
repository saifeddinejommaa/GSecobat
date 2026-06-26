using GSecobat.Application.Features.Missions.Requests;
using GSecobat.Application.Features.Missions.Responses;
using GSecobat.Application.Features.Missions.Services;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace GSecobat.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MissionsController : ControllerBase
    {
        private readonly IMissionsService _missionsService;
        private readonly IMediator _mediator;

        public MissionsController(IMediator mediator,IMissionsService missionsService) 
        { 
            _missionsService = missionsService;
            _mediator = mediator;
        }

        [HttpGet("all", Name = nameof(GetAllMissions))]
        [ProducesResponseType(typeof(List<MissionResponse>), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetAllMissions([FromQuery] MissionsRequestFilter filter)
        {
            List<MissionResponse> response = await _missionsService.GetAllMissions(filter);

            return Ok(response);
        }

        [HttpPost("new_mission_business_trip", Name = nameof(AddNewMissionBusinessTrip))]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        public async Task<IActionResult> AddNewMissionBusinessTrip([FromBody] AddMissionBusinessTripRequest request)
        {
            await _mediator.Send(request);
            return Ok();
        }

        [HttpPost("new_mission_construction_site", Name = nameof(AddNewMissionConstrcutionSite))]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        public async Task<IActionResult> AddNewMissionConstrcutionSite([FromBody] AddMissionConstructionSiteRequest request)
        {
            await _mediator.Send(request);
            return Ok();
        }
    }
}
