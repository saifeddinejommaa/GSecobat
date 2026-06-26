export type Machine = {
  id: number;
  serialNumber: string;
  assetTypeId: number;
  assetStatusId: number;
  purchaseDate: string | null;
  fiscalHorsepower: number;
  typeLabel: string;
  mch: string | null;
  assetStatusLabel: string;
  currentFuelQuantity: number | null;
};