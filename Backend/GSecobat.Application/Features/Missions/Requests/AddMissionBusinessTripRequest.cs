using GSecobat.Application.Features.Missions.Repositories;
using GSecobat.Application.Features.Missions.Services;
using MediatR;

namespace GSecobat.Application.Features.Missions.Requests
{
    public class AddMissionBusinessTripRequest : BaseAddMissionRequest
    {
        public int FromLocationId { get; set; }
        public int ToLocationId { get; set; }
        public int Distance { get; set; }
    }

    public class AddMissionBusinessTripRequestHandler : IRequestHandler<AddMissionBusinessTripRequest,Unit>
    {
        private readonly IMissionsService _missionService;

        public AddMissionBusinessTripRequestHandler(IMissionsService missionService)
        {
            _missionService = missionService;
        }

        public async Task<Unit> Handle(AddMissionBusinessTripRequest request, CancellationToken cancellationToken)
        {
            await _missionService.AddNewMissionBusinessTrip(request);
            return Unit.Value;
        }
    }
}
