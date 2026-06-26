using GSecobat.Application.Features.Constants.Responses;

namespace GSecobat.Application.Features.Constants.Repositories
{
    public interface IConstantsRepository
    {
        public Task<ConstantsResponse> GetConstants();
    }
}
