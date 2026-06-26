import { AssetRepository } from "../../data/repositories/AssetRepository";
import type { AddMachineRequest } from "../../data/requests/AddMachineRequest";


export const AddMachineUseCase = async (request: AddMachineRequest) => {
  const response = await AssetRepository.addAsset(request);
console.log(response)
  if (response.Code !== 200) {
    console.log(response)
    throw new Error(JSON.stringify(response));
  }

  return response.Response;
}; 