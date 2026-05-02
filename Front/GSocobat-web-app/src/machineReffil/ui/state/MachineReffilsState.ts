import { create } from "zustand";
import type { MachineReffil } from "../../domain/models/MachineReffil";
import { MachineReffilRepository } from "../../data/Repositories/MachineReffilRepository";
import type { MachineReffilsRequestFilter } from "../../domain/models/requestFilters/MachineReffilRequestFilter";

type MachineReffilsState = {
  machinesReffils: MachineReffil[];
  loading: boolean;
  filters: MachineReffilsRequestFilter;

  setFilter: (key: string, value: any) => void;
  clearFilters: () => void;
  fetchMachineReffils: () => Promise<void>;
};

export const useMachineReffilsStore = create<MachineReffilsState>((set, get) => ({
  machinesReffils: [],
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

  fetchMachineReffils: async () => {
    set({ loading: true });
    try {
      const data = await MachineReffilRepository.getAll(get().filters);
      set({ machinesReffils: data });
    } finally {
      set({ loading: false });
    }
  },
}));