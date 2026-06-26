using GSecobat.Application.Common;
using GSecobat.Application.Features.AssetReffil.Requests;
using GSecobat.Application.Features.AssetReffil.Services;
using GSecobat.Application.Features.AssetRefills.Responses;
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
        private readonly IFuelAssetRefillService _fuelAssetReffilService;
        private readonly IMediator _mediator;

        public AssetsController(IMediator mediator, IAssetService employeeService, IFuelAssetRefillService fuelAssetRefillService)
        {
            _assetService = employeeService;
            _fuelAssetReffilService = fuelAssetRefillService;
            _mediator = mediator;
        }

        #region GET

        [HttpGet("all", Name = nameof(GetAllAssets))]
        [ProducesResponseType(typeof(List<AssetForListResponse>), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetAllAssets([FromQuery] AssetsRequestFilter filter)
        {
            PagedResult<AssetForListResponse> response = await _assetService.GetAllAssets(filter);

            return Ok(response);
        }

        [HttpGet("all-reffils", Name = nameof(GetAllAssetReffils))]
        [ProducesResponseType(typeof(List<AssetReffilResponse>), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetAllAssetReffils([FromQuery] AssetReffilsRequestFilter filter)
        {
            PagedResult<AssetReffilResponse> response = await _fuelAssetReffilService.GetAllAssetRefills(filter);

            return Ok(response);
        }

        [HttpGet("{assetId:int}/details")]
        public async Task<IActionResult> GetAssetById(int assetId)
        {
            AssetForListResponse response = await _assetService.GetAssetById(assetId);

            return Ok(response);
        }

        #endregion

        #region POST

        [HttpPost("fuel-refills")]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        public async Task<IActionResult> FuelRefill([FromBody] FuelAssetReffilRequest request)
        {
            return Ok(await _mediator.Send(request));
        }

        [HttpPost("add-machine")]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        public async Task<IActionResult> AddAsset([FromBody] AddAssetRequest request)
        {
            return Ok(await _mediator.Send(request));
        }
        #endregion
    }
}
