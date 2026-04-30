import { AssetRepository } from "../data/repositories/AssetRepository";


export const GetAssetsUseCase = async (filters?: {
  assetType?: number;
  assetStatus?: number;
  serialNumber?: string;
}) => {
  const machines = await AssetRepository.getAll(filters);

  return machines.map((m) => ({
    ...m,
    isActive: m.assetStatusLabel === "Actif",
  }));
};