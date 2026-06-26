namespace GSecobat.Application.Features.DepotRefills.Responses
{
    public class FuelDepotReffilResponse
    {
        public int Id { get; set; }
        public required string FuelDepotName { get; set; }
        public required string FuelDepotRef { get; set; }
        public DateTime ReffilDate { get; set; }
        public double Quantity { get; set; }
        public int Total { get; set; }
    }
}
