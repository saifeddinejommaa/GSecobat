import { create } from "zustand";
import type { Machine } from "../Models/Machine";
import { AssetRepository } from "../../data/AssetRepository";

type MachineState = {
  machines: Machine[];
  loading: boolean;

  filters: {
    assetType?: number;
    assetStatus?: number;
    serialNumber?: string;
    mch?: string;
  };

  setFilter: (key: string, value: any) => void;
  clearFilters: () => void;

  fetchMachines: () => Promise<void>;
};


export const useMachineStore = create<MachineState>((set, get) => ({
  machines: [],
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

  fetchMachines: async () => {
    set({ loading: true });

    try {
      const data = await AssetRepository.getAll(get().filters);
      set({ machines: data.Response });
    } finally {
      set({ loading: false });
    }
  },
}));