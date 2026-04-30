import { API_BASE_URL } from "../../../constants";
import { http, type ApiResponse } from "../../../core/HttpClient";
import { mapAssetToModel } from "../mappers/AssetsMapper";
import type { AssetResponse } from "../responses/AssetResponse";


export const AssetRepository = {
  getAll: async (filters?: any) => {
    const params = new URLSearchParams(filters);
    console.log("Fetching assets with filters:", params.toString);
     const httpResponse = await  http<ApiResponse<AssetResponse[]>>(`${API_BASE_URL}assets/all?${params.toString()}`);
       return (httpResponse.Response ?? []).map(mapAssetToModel);
  },

  getAssetId: (id: number) => {
    return http<ApiResponse<AssetResponse>>(`${API_BASE_URL}assets/${id}/details/`);
  },
};