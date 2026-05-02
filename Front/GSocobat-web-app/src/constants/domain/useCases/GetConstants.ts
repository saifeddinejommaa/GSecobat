import { ConstantsRepository } from "../../data/Responses/Repositories/ConstantsRespository";

export const getConstants = async () => {
  const constants = await ConstantsRepository.getAll();
  return constants;
};