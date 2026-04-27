export type FuelDepot = {
  id: number;
  depotName?: string | null;
  capacity: number;
  currentLevel?: number | null;
  reference: string;
  type: string;
  locationAddress?: string | null;
};