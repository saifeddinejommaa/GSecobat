using GSecobat.Application.Features.Missions.Requests;
using GSecobat.Application.Features.Missions.Responses;

namespace GSecobat.Application.Features.Missions.Services
{
    public interface IMissionsService
    {
        public Task<List<MissionResponse>> GetAllMissions(MissionsRequestFilter filter);

        public Task<MissionResponse> GetMissionsById(int missionId);
    }
}
