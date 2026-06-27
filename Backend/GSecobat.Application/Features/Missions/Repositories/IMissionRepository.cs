using GSecobat.Application.Features.Missions.Requests;
using GSecobat.Domain.Entities;

namespace GSecobat.Application.Features.Missions.Repositories
{
    public interface IMissionRepository
    {
        public IQueryable<MissionBusinessTrip> GetMissionBusinessTripById(int id);

        public IQueryable<MissionConstructionSite> GetMissionConstructionSiteById(int id);

        public Task AddNewMissionBusinessTrip(AddMissionBusinessTripRequest mission);

        public Task AddNewMissionConstructionSite(AddMissionConstructionSiteRequest mission);
    }
}
