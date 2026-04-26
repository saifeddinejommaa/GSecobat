import { AssetRepository } from "../data/AssetRepository";

export const GetAssetsUseCase = async (filters?: {
  assetType?: number;
  assetStatus?: number;
  serialNumber?: string;
}) => {
  const machines = await AssetRepository.getAll(filters);

  return machines.Response.map((m) => ({
    ...m,
    isActive: m.assetStatusLabel === "Actif",
  }));
};