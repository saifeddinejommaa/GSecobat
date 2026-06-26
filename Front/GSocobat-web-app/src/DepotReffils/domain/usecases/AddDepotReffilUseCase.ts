import { DepotReffilRepository } from "../../data/repositories/DepotReffilRepository";
import type { AddDepotReffilRequest } from "../../data/requests/AddDepotReffilRequest";


export const AddDepotReffilUseCase = async (request: AddDepotReffilRequest) => {
  const response = await DepotReffilRepository.AddDepotReffil(request);
console.log(response)
  if (response.Code !== 200) {
    console.log(response)
    throw new Error(JSON.stringify(response));
  }

  return response.Response;
}; 