using GSecobat.Application.Features.Missions.Services;
using MediatR;

namespace GSecobat.Application.Features.Missions.Requests
{
    public class AddMissionConstructionSiteRequest : BaseAddMissionRequest
    {
        public int ContructionSiteId { get; set; }
        public int Hours { get; set; }
        
    }

    public class AddMissionConstructionSiteRequestHandler : IRequestHandler<AddMissionConstructionSiteRequest, Unit>
    {
        private readonly IMissionsService _missionService;

        public AddMissionConstructionSiteRequestHandler(IMissionsService missionService)
        {
            _missionService = missionService;
        }

        public async Task<Unit> Handle(AddMissionConstructionSiteRequest request, CancellationToken cancellationToken)
        {
            await _missionService.AddNewMissionConstructionSite(request);
            return Unit.Value;
        }
    }
}
