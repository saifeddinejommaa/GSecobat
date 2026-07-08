using GSecobat.Application.Common;
using GSecobat.Application.Features.Missions.Requests;
using GSecobat.Application.Features.Missions.Responses;

namespace GSecobat.Application.Features.Missions.Services
{
    public interface IMissionsService
    {
        public Task<PagedResult<MissionResponse>> GetAllMissions(MissionsRequestFilter filter);

        public Task AddNewMissionBusinessTrip(AddMissionBusinessTripRequest request);

        public Task AddNewMissionConstructionSite(AddMissionConstructionSiteRequest request);

        public Task<MissionResponse> GetMissionsById(int missionId);
    }
}
