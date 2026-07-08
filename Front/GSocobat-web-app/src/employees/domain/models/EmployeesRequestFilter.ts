import type { PaginationFilter } from "../../../core/PaginationFilter"

export type EmployeesRequestFilter = PaginationFilter & {
    employeeId? : number,
    name? : string
}