import { MissionRepository } from "../../data/repositories/MissionRepository";
import type { MissionRequestFilter } from "../models/MissionsRequestFIlter";

export const GetMissionsUseCase = async (filters?: MissionRequestFilter
) => {
  const employees = await MissionRepository.getAll(filters);

  return employees;
};