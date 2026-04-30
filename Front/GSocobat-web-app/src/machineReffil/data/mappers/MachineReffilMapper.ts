import type { MachineReffil } from "../../domain/models/MachineReffil";
import type { MachineReffilResponse } from "../Responses/MachineReffilResponse";

export const mapMachineReffilToModel = (entity: MachineReffilResponse): MachineReffil => {
  return {
    id: entity.id,
    reffilDate: entity.reffilDate,
    assetSerialNumber: entity.assetSerialNumber,
    depotName: entity.depotName,
    userId: entity.userId,
    quantity: entity.quantity,
    isFull: entity.isFull === 1
  };
};