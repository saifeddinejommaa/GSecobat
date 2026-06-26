import type { PaginationFilter } from "../../../core/PaginationFilter";

export type AssetsRequestFilter = PaginationFilter &{
   mch?: string;
  assetTypeId?: string;
  assetStatus?: number;
  serialNumber?: string;
}