import { create } from "zustand";
import type { FuelDepot } from "../../domain/Models/FuelDepot";
import { FuelDepotRepository } from "../../data/FuelDepotRespository";

type FuelDepotsState = {
  depots: FuelDepot[];
  loading: boolean;

  filters: {
    assetType?: number;
    assetStatus?: number;
    serialNumber?: string;
    mch?: string;
  };

  setFilter: (key: string, value: any) => void;
  clearFilters: () => void;

  fetchDepots: () => Promise<void>;
};


export const useDepotsStore = create<FuelDepotsState>((set, get) => ({
  depots: [],
  loading: false,

  filters: {},

  setFilter: (key, value) =>
    set((state) => ({
      filters: {
        ...state.filters,
        [key]: value,
      },
    })),

  clearFilters: () => set({ filters: {} }),

  fetchDepots: async () => {
    set({ loading: true });

    try {
      const data = await FuelDepotRepository.getAll(get().filters);
      set({ depots: data.Response });
    } finally {
      set({ loading: false });
    }
  },
}));