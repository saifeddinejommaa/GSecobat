using GSecobat.Application.Features.DepotReffils.Requests;

namespace GSecobat.Application.Features.DepotReffils.Services
{
    public interface IDepotReffilService
    {
        public Task<bool> ExecuteDepotReffil(DepotReffilRequest request);
    }
}
