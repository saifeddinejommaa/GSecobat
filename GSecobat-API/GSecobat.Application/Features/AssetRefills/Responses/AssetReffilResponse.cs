namespace GSecobat.Application.Features.AssetRefills.Responses
{
    public class AssetReffilResponse
    {
        public int Id { get; set; }
        public DateTime ReffilDate { get; set; }
        public required string AssetSerialNumber { get; set; }
        public required string DepotName { get; set; }
        public int UserId { get; set; }
        public double Quantity { get; set; }
        public int IsFull { get; set; }
        public int Total { get; set; }
    }
}
