import { AssetRepository } from "../data/repositories/AssetRepository";
import type { AssetsRequestFilter } from "./models/AssetsRequestFilter";


export const GetAssetsUseCase = async (filters: AssetsRequestFilter) => {
  return await AssetRepository.getAll(filters);

};