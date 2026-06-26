import type { Asset } from "../../domain/models/Asset";
import type { AssetResponse } from "../responses/AssetResponse";

export const mapAssetToModel = (entity: AssetResponse): Asset => {
  return {
    id: entity.id,
    serialNumber: entity.serialNumber,
    assetTypeId: entity.assetTypeId,
    assetStatusId: entity.assetStatusId,
    purchaseDate: entity.purchaseDate,
    fiscalHorsepower: entity.fiscalHorsepower,
    typeLabel: entity.typeLabel,
    mch: entity.mch,
    assetStatusLabel: entity.assetStatusLabel,
    currentFuelQuantity: entity.currentFuelQuantity
  };
};