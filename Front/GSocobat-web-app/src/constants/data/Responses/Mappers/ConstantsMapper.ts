import type { Constants } from "../../../domain/Models/Constants";
import type { ConstantItemResponse } from "../ConstantResponse";
import type { ConstantsResponse } from "../ConstantsResponse";

export function mapConstantsResponseToModel(response: ConstantsResponse) : Constants {
    return  {
        locationTypes: mapConstantItemResponseToModel(response.locationTypes),
        assetStatuses: mapConstantItemResponseToModel(response.assetStatuses),
        assetTypes: mapConstantItemResponseToModel(response.assetTypes),
        fuelDepotTypes: mapConstantItemResponseToModel(response.fuelDepotTypes),
    }
}

export function mapConstantItemResponseToModel(items?: ConstantItemResponse[]) {
  return (items ?? []).map((item) => ({
    id: item.id,
    label: item.label,
  }));
};