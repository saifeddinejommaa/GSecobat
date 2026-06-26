import { API_BASE_URL } from "../../../constants";
import { http, type ApiResponse } from "../../../core/HttpClient";
import { buildQueryParams } from "../../../core/QueryUtils";
import type { MissionRequestFilter } from "../../domain/models/MissionsRequestFIlter";
import { MapToMissionModel } from "../mappers/MissionMapper";
import type { MissionResponse } from "../Responses/MissionResponse";

export const MissionRepository = {
  getAll: async (filters?: MissionRequestFilter) => {
    
      const params = buildQueryParams(filters as any);
       const httpResponse = await  http<ApiResponse<MissionResponse[]>>(`${API_BASE_URL}missions/all?${params.toString()}`);
         return (httpResponse.Response ?? []).map(MapToMissionModel);
    },
  
    getAssetId: (id: number) => {
      return http<ApiResponse<MissionResponse>>(`${API_BASE_URL}assets/${id}/details/`);
    },
};