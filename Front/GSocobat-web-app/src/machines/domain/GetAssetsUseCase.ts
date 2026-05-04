import { AssetRepository } from "../data/repositories/AssetRepository";
import type { AssetsRequestFilter } from "./models/AssetsRequestFilter";


export const GetAssetsUseCase = async (filters: AssetsRequestFilter) => {
  const machines = await AssetRepository.getAll(filters);

  return machines.map((m) => ({
    ...m,
    isActive: m.assetStatusLabel === "Actif",
  }));
};