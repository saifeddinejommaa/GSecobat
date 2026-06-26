import type { PaginationFilter } from "../../../core/PaginationFilter"

export type DepotReffilRequestFilter = PaginationFilter &{
    fuelDepotId?: number,
    reffilDate?: Date,
    fuelDepotRef?: string
}