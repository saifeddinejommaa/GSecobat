import { API_BASE_URL } from "../../../constants";
import { http, type ApiResponse } from "../../../core/HttpClient";
import { buildQueryParams } from "../../../core/QueryUtils";
import type { MachineReffilsRequestFilter } from "../../domain/models/requestFilters/MachineReffilRequestFilter";
import { mapMachineReffilToModel } from "../mappers/MachineReffilMapper";
import type { MachineReffilResponse } from "../Responses/MachineReffilResponse";


export const MachineReffilRepository = {
  getAll: async (filters?: MachineReffilsRequestFilter) => {
    
      const params = buildQueryParams(filters as any);
      console.log("Fetching machine reffils with filters:",`${API_BASE_URL}assets/all-reffils?${params.toString()}`);
       const httpResponse = await  http<ApiResponse<MachineReffilResponse[]>>(`${API_BASE_URL}assets/all-reffils?${params.toString()}`);
         return (httpResponse.Response ?? []).map(mapMachineReffilToModel);
    },
  
    getAssetId: (id: number) => {
      return http<ApiResponse<MachineReffilResponse>>(`${API_BASE_URL}assets/${id}/details/`);
    },
};