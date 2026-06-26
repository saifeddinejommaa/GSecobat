using GSecobat.Application.Features.Constants.Repositories;
using GSecobat.Application.Features.Constants.Responses;

namespace GSecobat.Application.Features.Constants.Services
{
    public class ConstantsService : IConstantsService
    {
        private readonly IConstantsRepository _constantsRepository;

        public ConstantsService(IConstantsRepository constantsRepository)
        {
            _constantsRepository = constantsRepository;
        }
        public async Task<ConstantsResponse> GetConstants()
        {
            return await _constantsRepository.GetConstants();
        }
    }
}
