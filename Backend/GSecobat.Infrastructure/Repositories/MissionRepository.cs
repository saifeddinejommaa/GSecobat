using GSecobat.Application.Features.Missions.Repositories;
using GSecobat.Application.Features.Missions.Requests;
using GSecobat.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace GSocobat.Infrastructure.Repositories
{
    public class MissionRepository : IMissionRepository
    {
        private readonly GSecobatAppDbContext _context;
        public MissionRepository(GSecobatAppDbContext context) 
        {
            _context = context;
        }

        public async Task AddNewMissionBusinessTrip(AddMissionBusinessTripRequest mission)
        {
            Mission newMission = new Mission()
            {
                MissionTitle = mission.MissionTitle,
                MissionDesc = mission.MissionDesc,
                StartDate = mission.StartDate,
                EmployeeId = mission.EmployeeId,
                AssetId = mission.AssetId,
                EndDate = mission.EndDate,
                MissionTypeId = 1,
            };

            _context.Missions.Add(newMission);

            await _context.SaveChangesAsync();

            var missionId = newMission.Id;
            var missionTrip = new MissionBusinessTrip
            {
                MissionId = missionId,
                FromLocationId = mission.FromLocationId,
                ToLocationId = mission.ToLocationId,
                Distance = mission.Distance,
            };

            _context.MissionBusinessTrips.Add(missionTrip);

            await _context.SaveChangesAsync();
        }

        public async Task AddNewMissionConstructionSite(AddMissionConstructionSiteRequest mission)
        {
            Mission newMission = new Mission()
            {
                MissionTitle = mission.MissionTitle,
                MissionDesc = mission.MissionDesc,
                StartDate = mission.StartDate,
                EmployeeId = mission.EmployeeId,
                AssetId = mission.AssetId,
                EndDate = mission.EndDate,
                MissionTypeId = 1,
            };

            _context.Missions.Add(newMission);

            await _context.SaveChangesAsync();

            var missionId = newMission.Id;
            var missionConstructionSite = new MissionConstructionSite
            {
                MissionId = missionId,
                Hours = mission.Hours,
                LocationId = mission.ContructionSiteId,
            };

            _context.MissionConstructionSites.Add(missionConstructionSite);

            await _context.SaveChangesAsync();
        }

        public IQueryable<MissionBusinessTrip> GetMissionBusinessTripById(int id)
        {
            throw new NotImplementedException();
        }

        public IQueryable<MissionConstructionSite> GetMissionConstructionSiteById(int id)
        {
            throw new NotImplementedException();
        }
    }
}
