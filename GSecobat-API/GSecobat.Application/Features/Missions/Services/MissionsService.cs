using GSecobat.Application.Features.Missions.Repositories;
using GSecobat.Application.Features.Missions.Requests;
using GSecobat.Application.Features.Missions.Responses;

namespace GSecobat.Application.Features.Missions.Services
{
    public class MissionsService : IMissionsService
    {
        private readonly IMissionsQueryRepository _missionsQueryRepository;

        public MissionsService(IMissionsQueryRepository missionsQueryRepository)
        {
            _missionsQueryRepository = missionsQueryRepository;
        }

        public async Task<List<MissionResponse>> GetAllMissions(MissionsRequestFilter filter)
        {
            return await _missionsQueryRepository.GetAllMissionsAsync(filter);
        }

        public Task<MissionResponse> GetMissionsById(int missionId)
        {
            throw new NotImplementedException();
        }
    }
}
