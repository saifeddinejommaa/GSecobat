using GSecobat.Domain.Entities;

namespace GSecobat.Application.Features.Site
{
    public interface ILocationRepository
    {
        Task<List<Location>> GetAllAddress();
    }
}
