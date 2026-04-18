#nullable enable
namespace GSecobat.Application.Features.FuelDepots.Responses
{
    public class FuelDepotsListResponse
    {
        public int Id { get; set; }

        public string? DepotName { get; set; }

        public int Capacity { get; set; }

        public int? CurrentLevel { get; set; }

        public required string Reference { get; set; }

        public required string Type { get; set; }

        public string? LocationAddress { get; set; }
    }
}
