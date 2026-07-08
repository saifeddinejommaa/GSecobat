using GSecobat.Application.Common;
using GSecobat.Application.Features.Missions.Repositories;
using GSecobat.Application.Features.Missions.Requests;
using GSecobat.Application.Features.Missions.Responses;

namespace GSecobat.Application.Features.Missions.Services
{
    public class MissionsService : IMissionsService
    {
        private readonly IMissionsQueryRepository _missionsQueryRepository;
        private readonly IMissionRepository _missionRepository;

        public MissionsService(IMissionRepository missionRepository,IMissionsQueryRepository missionsQueryRepository)
        {
            _missionRepository = missionRepository;
            _missionsQueryRepository = missionsQueryRepository;
        }

        public async Task AddNewMissionBusinessTrip(AddMissionBusinessTripRequest request)
        {
            await _missionRepository.AddNewMissionBusinessTrip(request);
        }

        public async Task AddNewMissionConstructionSite(AddMissionConstructionSiteRequest request)
        {
            await _missionRepository.AddNewMissionConstructionSite(request);
        }

        public async Task<PagedResult<MissionResponse>> GetAllMissions(MissionsRequestFilter filter)
        {
            return await _missionsQueryRepository.GetAllMissionsAsync(filter);
        }

        public Task<MissionResponse> GetMissionsById(int missionId)
        {
            throw new NotImplementedException();
        }
    }
}
