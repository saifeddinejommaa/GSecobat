import { API_BASE_URL } from "../../../constants";
import { http, type ApiResponse } from "../../../core/HttpClient";
import type { PagedResult } from "../../../core/PagedResult";
import { mapEmployeeResponseToModel } from "../mappers/EmployeeMapper";
import type { EmployeeResponse } from "../responses/EmployeeResponse";

export const EmployeesRepository = {
  getAll: async () => {
       const httpResponse = await  http<ApiResponse<PagedResult<EmployeeResponse>>>(`${API_BASE_URL}employees/all`);
        return {
                      pageNumber: httpResponse.Response.pageNumber,
                      pageSize: httpResponse.Response.pageSize,
                      totalCount: httpResponse.Response.totalCount,
                      items: httpResponse.Response.items.map(mapEmployeeResponseToModel),
                    };
    },
  
    getAssetId: (id: number) => {
      return http<ApiResponse<EmployeeResponse>>(`${API_BASE_URL}assets/${id}/details/`);
    },
};