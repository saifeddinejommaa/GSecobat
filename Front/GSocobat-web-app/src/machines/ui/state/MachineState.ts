import { create } from "zustand";
import type { Machine } from "../Models/Machine";
import { GetAssetsUseCase } from "../../domain/GetAssetsUseCase";
import type { AssetsRequestFilter } from "../../domain/models/AssetsRequestFilter";

type MachineState = {
  machines: Machine[];
  loading: boolean;

  filters: AssetsRequestFilter;

  setFilter: (key: string, value: any) => void;
  clearFilters: () => void;

  fetchMachines: () => Promise<void>;
};


export const useMachineStore = create<MachineState>((set, get) => ({
  machines: [],
  loading: false,

  filters: {
  },

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
      const data = await GetAssetsUseCase(get().filters);
      set({ machines: data });
    } finally {
      set({ loading: false });
    }
  },
}));