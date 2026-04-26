import { API_BASE_URL } from "../../constants";
import { http, type ApiResponse } from "../../core/HttpClient";
import type { AssetResponse } from "./responses/AssetResponse";

export const AssetRepository = {
  getAll: (filters?: any) => {
    const params = new URLSearchParams(filters);
    return http<ApiResponse<AssetResponse[]>>(`${API_BASE_URL}assets/all?${params.toString()}`);
  },

  getAssetId: (id: number) => {
    return http<ApiResponse<AssetResponse>>(`${API_BASE_URL}assets/${id}/details/`);
  },
};