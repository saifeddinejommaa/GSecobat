import { API_BASE_URL } from "../../constants";
import { http, type ApiResponse } from "../../core/HttpClient";
import { buildQueryParams } from "../../core/QueryUtils";
import { mapFuelDepotResponseToModel } from "./mappers/MapFuelDepotResponseToModel";
import type { FuelDepotResponse } from "./Responses/FuelDepotResponse";

export const FuelDepotRepository = {
  getAll: async(filters?: any) => {
     const params = buildQueryParams(filters as any);
      const httpResponse = await http<ApiResponse<FuelDepotResponse[]>>(`${API_BASE_URL}fueldepots/all?${params.toString()}`);
         return (httpResponse.Response ?? []).map(mapFuelDepotResponseToModel);
  },

  getFuelDepotById: (id: number) => {
    return http<ApiResponse<FuelDepotResponse>>(`${API_BASE_URL}fueldepots/${id}/details/`);
  },
};