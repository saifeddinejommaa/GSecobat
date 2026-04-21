using GSecobat.Application.Features.Assets.Requests;
using GSecobat.Application.Features.Assets.Responses;
using GSecobat.Application.Features.Assets.Services;
using GSecobat.Application.Features.FuelAssetReffil.Requests;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace GSecobat.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AssetController : ControllerBase
    {
        private readonly IAssetService _assetService;
        private readonly IMediator _mediator;

        public AssetController(IMediator mediator, IAssetService employeeService)
        {
            _assetService = employeeService;
            _mediator = mediator;
        }

        [HttpGet("GetAll", Name = nameof(GetAllAssets))]
        [ProducesResponseType(typeof(List<AssetResponse>), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetAllAssets([FromQuery] AssetsRequestFilter filter)
        {
            List<AssetResponse> response = await _assetService.GetAllAssets(filter);

            return Ok(response);
        }

        [HttpGet("{assetId:int}/details")]
        public async Task<IActionResult> GetAssetById(int assetId)
        {
            AssetResponse response = await _assetService.GetAssetById(assetId);

            return Ok(response);
        }

        [HttpPost("FuelReffil")]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        public async Task<IActionResult> FuelReffil([FromBody] FuelAssetReffilRequest request)
        {
            return Ok(await _mediator.Send(request));
        }
    }
}
