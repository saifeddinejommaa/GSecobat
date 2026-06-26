import type { PaginationFilter } from "../../../../core/PaginationFilter";

export type MachineReffilsRequestFilter  = PaginationFilter &{
  reffilDate?: string;
  assetSerialNumber?: string;
  depotName?: string;
  assetType?:number;
  fuelDepotTypeId?: number;
};