using GSecobat.Application.Features.Missions.Requests;
using GSecobat.Application.Features.Missions.Responses;
using GSecobat.Application.Features.Missions.Services;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace GSecobat.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MissionsController : ControllerBase
    {
        private readonly IMissionsService _missionsService;

        public MissionsController(IMissionsService missionsService) 
        { 
            _missionsService = missionsService;
        }

        [HttpGet("all", Name = nameof(GetAllMissions))]
        [ProducesResponseType(typeof(List<MissionResponse>), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetAllMissions([FromQuery] MissionsRequestFilter filter)
        {
            List<MissionResponse> response = await _missionsService.GetAllMissions(filter);

            return Ok(response);
        }
    }
}
