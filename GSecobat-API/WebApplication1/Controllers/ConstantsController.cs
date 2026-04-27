using GSecobat.Application.Features.Assets.Responses;
using GSecobat.Application.Features.Constants.Responses;
using GSecobat.Application.Features.Constants.Services;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace GSecobat.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ConstantsController : ControllerBase
    {
        private readonly IConstantsService _constantsService;
        public ConstantsController(IConstantsService constantsService)
        {
            _constantsService = constantsService;
        }

        [HttpGet(Name = nameof(GetConstants))]
        [ProducesResponseType(typeof(List<AssetResponse>), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetConstants()
        {
            ConstantsResponse response = await _constantsService.GetConstants();

            return Ok(response);
        }
    }
}

