import { API_BASE_URL } from "../../../constants";
import { http, type ApiResponse } from "../../../core/HttpClient";
import type { PagedResult } from "../../../core/PagedResult";
import { buildQueryParams } from "../../../core/QueryUtils";
import type { MachineReffilsRequestFilter } from "../../domain/models/requestFilters/MachineReffilRequestFilter";
import { mapMachineReffilToModel } from "../mappers/MachineReffilMapper";
import type { AddMachineReffilRequest } from "../requests/AddMachineReffilRequest";
import type { MachineReffilResponse } from "../Responses/MachineReffilResponse";


export const MachineReffilRepository = {
  getAll: async (filters?: MachineReffilsRequestFilter) => {

    const params = buildQueryParams(filters as any);
    const httpResponse = await http<ApiResponse<PagedResult<MachineReffilResponse>>>(`${API_BASE_URL}assets/all-reffils?${params.toString()}`);
    console.log("Data", httpResponse)
     return {
          pageNumber: httpResponse.Response.pageNumber,
          pageSize: httpResponse.Response.pageSize,
          totalCount: httpResponse.Response.totalCount,
          items: httpResponse.Response.items.map(mapMachineReffilToModel),
        };
    return 
  },

  getAssetId: (id: number) => {
    return http<ApiResponse<MachineReffilResponse>>(`${API_BASE_URL}assets/${id}/details/`);
  },

  addMachineReffil: async (request: AddMachineReffilRequest) => {
    return http<ApiResponse<boolean>>(
      `${API_BASE_URL}assets/fuel-refills/`,
      {
        method: "POST",
        body: request,
      }
    );
  }
};