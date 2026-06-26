import { API_BASE_URL } from "../../../constants";
import { http, type ApiResponse } from "../../../core/HttpClient";
import { mapEmployeeResponseToModel } from "../mappers/EmployeeMapper";
import type { EmployeeResponse } from "../responses/EmployeeResponse";

export const EmployeesRepository = {
  getAll: async () => {
       const httpResponse = await  http<ApiResponse<EmployeeResponse[]>>(`${API_BASE_URL}employees/all`);
         return (httpResponse.Response ?? []).map(mapEmployeeResponseToModel);
    },
  
    getAssetId: (id: number) => {
      return http<ApiResponse<EmployeeResponse>>(`${API_BASE_URL}assets/${id}/details/`);
    },
};