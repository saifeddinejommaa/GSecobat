using GSecobat.Application.Features.FuelDepots.Requests;
using GSecobat.Application.Features.FuelDepots.Responses;
using GSecobat.Domain.Entities;
using System;

namespace GSecobat.Application.Features.FuelDepots.Repositories
{
    public interface IFuelDepotQueryRepository
    {
        Task<List<FuelDepotsListResponse>> GetFuelDepotsList(FuelDepotRequestFilter filter);
    }
}
