using GSecobat.Application.Features.Assets.Responses;
using GSecobat.Application.Features.Assets.Services;
using Microsoft.AspNetCore.Mvc;

namespace GSecobat.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AssetController : ControllerBase
    {
        IAssetService _assetService;
        public AssetController(IAssetService employeeService)
        {
            _assetService = employeeService;
        }

        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAllEmployees()
        {
            List<AssetResponse> response = await _assetService.GetAllAssets();

            return Ok(response);
        }

        [HttpGet("{assetId:int}/details")]
        public async Task<IActionResult> GetAssetById(int assetId)
        {
            AssetResponse response = await _assetService.GetAssetById(assetId);

            return Ok(response);
        }

        [HttpGet("/serial_number/{serialNumber:string}/details")]
        public async Task<IActionResult> GetAssetBySerialNumber(string serialNumber)
        {
            AssetResponse response = await _assetService.GetAssetBySerialNumber(serialNumber);

            return Ok(response);
        }
    }
}
