import type { Employee } from "../../domain/models/Employee";
import type { EmployeeResponse } from "../responses/EmployeeResponse";

export function mapEmployeeResponseToModel(response: EmployeeResponse): Employee {
  return {
    id: response.id,    
    firstName: response.firstName,
    lastName: response.lastName,
    birthDate: new Date(response.birthDate),
  };
}