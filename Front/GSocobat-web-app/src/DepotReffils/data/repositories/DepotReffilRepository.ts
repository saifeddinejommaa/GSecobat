import { API_BASE_URL } from "../../../constants";
import { http, type ApiResponse } from "../../../core/HttpClient";
import { depotReffilMapper } from "../mappers/DepotReffilMapper";
import type { DepotReffilResponse } from "../responses/DepotReffilResponse";

export const DepotReffilRepository = {
  getAll: async () => {
       const httpResponse = await  http<ApiResponse<DepotReffilResponse[]>>(`${API_BASE_URL}FuelDepots/all-reffils`);
         return (httpResponse.Response ?? []).map(depotReffilMapper);
    },
  
    getAssetId: (id: number) => {
      return http<ApiResponse<DepotReffilResponse>>(`${API_BASE_URL}FuelDepots/${id}/details/`);
    },
};