export type AddMachineRequest = {
  serialNumber: string;
  assetTypeId: number;
  purchaseDate: string | null;
  fiscalHorsepower: number;
  mch: string | null;
  currentFuelQuantity: number;
};