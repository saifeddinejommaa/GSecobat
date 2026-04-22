using GSecobat.Application.Features.AssetReffil.Requests;
using GSecobat.Application.Features.Assets.Requests;
using GSecobat.Application.Features.Assets.Responses;
using GSecobat.Application.Features.Assets.Services;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace GSecobat.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AssetsController : ControllerBase
    {
        private readonly IAssetService _assetService;
        private readonly IMediator _mediator;

        public AssetsController(IMediator mediator, IAssetService employeeService)
        {
            _assetService = employeeService;
            _mediator = mediator;
        }

        [HttpGet("all", Name = nameof(GetAllAssets))]
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

        [HttpPost("fuel-refills")]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        public async Task<IActionResult> FuelRefill([FromBody] FuelAssetReffilRequest request)
        {
            return Ok(await _mediator.Send(request));
        }
    }
}
