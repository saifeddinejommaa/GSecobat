
using MediatR;

namespace GSecobat.Application.Features.Missions.Requests
{
    public abstract class BaseAddMissionRequest : IRequest<Unit>
    {
        public int EmployeeId { get; set; }
        public required string MissionDesc { get; set; }
        public required string MissionTitle { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int AssetId { get; set; }
    }
}
