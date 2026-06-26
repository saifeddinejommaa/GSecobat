import { API_BASE_URL } from "../../../constants";
import { http, type ApiResponse } from "../../../core/HttpClient";
import type { PagedResult } from "../../../core/PagedResult";
import { buildQueryParams } from "../../../core/QueryUtils";
import type { AssetsRequestFilter } from "../../domain/models/AssetsRequestFilter";
import { mapAssetToModel } from "../mappers/AssetsMapper";
import type { AddMachineRequest } from "../requests/AddMachineRequest";
import type { AssetResponse } from "../responses/AssetResponse";


export const AssetRepository = {
  getAll: async (filters: AssetsRequestFilter) => {
    const params = buildQueryParams(filters as any);

    const httpResponse = await http<ApiResponse<PagedResult<AssetResponse>>>(`${API_BASE_URL}assets/all?${params.toString()}`);
    return {
      pageNumber: httpResponse.Response.pageNumber,
      pageSize: httpResponse.Response.pageSize,
      totalCount: httpResponse.Response.totalCount,
      items: httpResponse.Response.items.map(mapAssetToModel),
    };
  },

  getAssetId: (id: number) => {
    return http<ApiResponse<AssetResponse>>(`${API_BASE_URL}assets/${id}/details/`);
  },

  addAsset: async (request: AddMachineRequest) => {
    return http<ApiResponse<boolean>>(
      `${API_BASE_URL}assets/add-machine/`,
      {
        method: "POST",
        body: request,
      }
    );
  }
};