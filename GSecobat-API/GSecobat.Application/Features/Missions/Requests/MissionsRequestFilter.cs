namespace GSecobat.Application.Features.Missions.Requests
{
    public class MissionsRequestFilter
    {
        public int MissionTypeId { get; set; }
        public string? EmployeeName { get; set; }
        public string? MissionLocation { get; set; }
    }
}
