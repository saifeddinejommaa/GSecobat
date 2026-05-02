namespace GSecobat.Application.Features.DepotRefills.Requests
{
    public class FuelDepotReffilRequestFilter
    {
        public int FuelDepotId { get; set; }
        public DateTime? ReffilDate { get; set; }
        public string? FuelDepotRef { get; set; }
    }
}
