import type { FuelDepot } from "../../domain/Models/FuelDepot";
import type { FuelDepotResponse } from "../Responses/FuelDepotResponse";

export const mapFuelDepotResponseToModel = (entity: FuelDepotResponse): FuelDepot => {
  return {
    id: entity.id,
    depotName: entity.depotName??"",
    capacity: entity.capacity,
    currentLevel: entity.currentLevel,
    reference: entity.reference,
    type: entity.type,
    locationAddress: entity.locationAddress,
  };
};