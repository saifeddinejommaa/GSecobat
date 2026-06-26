import { API_BASE_URL } from "../../../../constants";
import { http, type ApiResponse } from "../../../../core/HttpClient";
import type { ConstantsResponse } from "../ConstantsResponse";
import { mapConstantsResponseToModel } from "../Mappers/ConstantsMapper";

export const ConstantsRepository = {
  getAll: async (): Promise<ConstantsResponse> => {
    const httpResponse = await http<ApiResponse<ConstantsResponse>>(
      `${API_BASE_URL}constants`
    );
   
      const constantsResponse = httpResponse.Response;
       
    return mapConstantsResponseToModel(constantsResponse);
  },
};