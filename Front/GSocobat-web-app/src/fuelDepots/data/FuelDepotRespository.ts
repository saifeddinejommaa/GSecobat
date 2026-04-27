import { API_BASE_URL } from "../../constants";
import { http, type ApiResponse } from "../../core/HttpClient";
import type { FuelDepotResponse } from "./Responses/FuelDepotResponse";

export const FuelDepotRepository = {
  getAll: (filters?: any) => {
    const params = new URLSearchParams(filters);
    return http<ApiResponse<FuelDepotResponse[]>>(`${API_BASE_URL}fueldepots/all?${params.toString()}`);
  },

  getFuelDepotById: (id: number) => {
    return http<ApiResponse<FuelDepotResponse>>(`${API_BASE_URL}fueldepots/${id}/details/`);
  },
};