import { MachineReffilRepository } from "../../data/Repositories/MachineReffilRepository";
import type { AddMachineReffilRequest } from "../../data/requests/AddMachineReffilRequest";

export const AddMachineReffilUseCase = async (request: AddMachineReffilRequest) => {
  const response = await MachineReffilRepository.addMachineReffil(request);
console.log(response)
  if (response.Code !== 200) {
    console.log(response)
    throw new Error(JSON.stringify(response));
  }

  return response.Response;
}; 