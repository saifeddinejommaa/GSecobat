namespace GSecobat.Application.Features.FuelAssetReffil.Repositories
{
    public interface IFuelAssetReffilRepository
    {
        public Task SaveChanges(Domain.Entities.FuelAssetReffil entity);
    }
}
