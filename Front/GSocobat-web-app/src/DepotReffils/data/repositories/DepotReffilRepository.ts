import { API_BASE_URL } from "../../../constants";
import { http, type ApiResponse } from "../../../core/HttpClient";
import type { PagedResult } from "../../../core/PagedResult";
import { buildQueryParams } from "../../../core/QueryUtils";
import type { DepotReffilRequestFilter } from "../../domain/models/DepotReffilRequestFilter";
import { depotReffilMapper } from "../mappers/DepotReffilMapper";
import type { AddDepotReffilRequest } from "../requests/AddDepotReffilRequest";
import type { DepotReffilResponse } from "../responses/DepotReffilResponse";

export const DepotReffilRepository = {
  getAll: async (filters: DepotReffilRequestFilter) => {
    const params = buildQueryParams(filters as any);
    const httpResponse = await http<ApiResponse<PagedResult<DepotReffilResponse>>>(`${API_BASE_URL}FuelDepots/all-reffils?${params.toString()}`);

    return {
      pageNumber: httpResponse.Response.pageNumber,
      pageSize: httpResponse.Response.pageSize,
      totalCount: httpResponse.Response.totalCount,
      items: httpResponse.Response.items.map(depotReffilMapper),
    };
  },

  AddDepotReffil: async (request: AddDepotReffilRequest) => {
    return http<ApiResponse<boolean>>(
      `${API_BASE_URL}FuelDepots/fuel-Refills/`,
      {
        method: "POST",
        body: request,
      }
    );
  },

  getAssetId: (id: number) => {
    return http<ApiResponse<DepotReffilResponse>>(`${API_BASE_URL}FuelDepots/${id}/details/`);
  },
};