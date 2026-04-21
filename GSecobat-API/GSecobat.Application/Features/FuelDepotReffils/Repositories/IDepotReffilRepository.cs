using GSecobat.Domain.Entities;
namespace GSecobat.Application.Features.DepotReffils.Repositories
{
    public interface IDepotReffilRepository
    {
        public Task SaveChanges(FuelDepotReffil entity);
    }
}
