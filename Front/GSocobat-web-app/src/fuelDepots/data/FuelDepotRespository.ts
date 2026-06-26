import { API_BASE_URL } from "../../constants";
import { http, type ApiResponse } from "../../core/HttpClient";
import type { PagedResult } from "../../core/PagedResult";
import { buildQueryParams } from "../../core/QueryUtils";
import { mapFuelDepotResponseToModel } from "./mappers/MapFuelDepotResponseToModel";
import type { FuelDepotResponse } from "./Responses/FuelDepotResponse";

export const FuelDepotRepository = {
  getAll: async (filters?: any) => {
    const params = buildQueryParams(filters as any);
    const httpResponse = await http<ApiResponse<PagedResult<FuelDepotResponse>>>(`${API_BASE_URL}fueldepots/all?${params.toString()}`);

    return {
      pageNumber: httpResponse.Response.pageNumber,
      pageSize: httpResponse.Response.pageSize,
      totalCount: httpResponse.Response.totalCount,
      items: httpResponse.Response.items.map(mapFuelDepotResponseToModel),
    };
  },

  getFuelDepotById: (id: number) => {
    return http<ApiResponse<FuelDepotResponse>>(`${API_BASE_URL}fueldepots/${id}/details/`);
  },
};