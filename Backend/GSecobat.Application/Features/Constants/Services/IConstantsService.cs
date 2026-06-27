using GSecobat.Application.Features.Constants.Responses;

namespace GSecobat.Application.Features.Constants.Services
{
    public interface IConstantsService
    {
        public Task<ConstantsResponse> GetConstants();
    }
}
