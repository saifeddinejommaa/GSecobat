using GSecobat.Application.Common;
using GSecobat.Application.Features.Missions.Requests;
using GSecobat.Application.Features.Missions.Responses;

namespace GSecobat.Application.Features.Missions.Repositories
{
    public interface IMissionsQueryRepository
    {
        public Task<PagedResult<MissionResponse>> GetAllMissionsAsync(MissionsRequestFilter filter);
    }
}
