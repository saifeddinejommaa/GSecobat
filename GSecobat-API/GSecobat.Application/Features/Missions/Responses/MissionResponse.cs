namespace GSecobat.Application.Features.Missions.Responses
{
    public class MissionResponse
    {
        public int Id { get; set; }
        public int MissionTypeId { get; set; }
        public required string MissionTitle { get; set; }
        public double? Distance { get; set; }
        public double? Hours { get; set; }
        public required string EmployeeName { get; set; }
        public string? ConstructionSiteAddress { get; set; }
        public string? MissionDesc { get; set; }
        public string? FromAddress { get; set; }
        public string? ToAddress { get; set; }
    }
}
