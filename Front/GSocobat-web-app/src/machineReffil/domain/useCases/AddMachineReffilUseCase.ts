import { MachineReffilRepository } from "../../data/Repositories/MachineReffilRepository";
import type { AddMachineReffilRequest } from "../../data/requests/AddMachineReffilRequest";

export const AddMachineReffilUseCase = async (request: AddMachineReffilRequest) => {
  const response = await MachineReffilRepository.addMachineReffil(request);

  if (response.Code !== 200) {
    throw new Error(response.ResponseMessage);
  }

  return response.Response;
};