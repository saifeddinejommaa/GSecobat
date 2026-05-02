import type { DepotReffil } from "../../domain/models/DepotReffil";
import type { DepotReffilResponse } from "../responses/DepotReffilResponse";

export function depotReffilMapper(response: DepotReffilResponse) : DepotReffil {
   return {
    id : response.id,
    fuelDpotName : response.fuelDpotName,
    fuelDepotRef : response.fuelDepotRef,
    quantity : response.quantity,
    reffilDate : response.reffilDate
   }
}