import { API_BASE_URL } from "../../../constants";
import { http, type ApiResponse } from "../../../core/HttpClient";
import { buildQueryParams } from "../../../core/QueryUtils";
import type { AssetsRequestFilter } from "../../domain/models/AssetsRequestFilter";
import { mapAssetToModel } from "../mappers/AssetsMapper";
import type { AssetResponse } from "../responses/AssetResponse";


export const AssetRepository = {
  getAll: async (filters: AssetsRequestFilter) => {
    const params = buildQueryParams(filters as any);

    const httpResponse = await http<ApiResponse<AssetResponse[]>>(`${API_BASE_URL}assets/all?${params.toString()}`);
    return (httpResponse.Response ?? []).map(mapAssetToModel);
  },

  getAssetId: (id: number) => {
    return http<ApiResponse<AssetResponse>>(`${API_BASE_URL}assets/${id}/details/`);
  },
};