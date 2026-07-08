import { FuelDepotRepository } from "../data/FuelDepotRespository";



export const GetFuelDepotsUseCase = async (filters: any) => {
  const fuelDepots = await FuelDepotRepository.getAll(filters);
  
  return fuelDepots;
};