import type { PaginationFilter } from "../../../core/PaginationFilter"

export type MissionRequestFilter = PaginationFilter & {
    missionTypeId? : number,
    EmployeeName? : string
}