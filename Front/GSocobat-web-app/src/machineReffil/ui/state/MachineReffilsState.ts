import { create } from "zustand";
import type { MachineReffil } from "../../domain/models/MachineReffil";
import { MachineReffilRepository } from "../../data/Repositories/MachineReffilRepository";
import type { MachineReffilsRequestFilter } from "../../domain/models/requestFilters/MachineReffilRequestFilter";
import type { PagedResult } from "../../../core/PagedResult";

type MachineReffilsState = {
  machinesReffils: PagedResult<MachineReffil>;
  loading: boolean;
  filters: MachineReffilsRequestFilter;

  setFilter: (key: string, value: any) => void;
  clearFilters: () => void;
  fetchMachineReffils: () => Promise<void>;
};

export const useMachineReffilsStore = create<MachineReffilsState>((set, get) => ({
  machinesReffils:{items: [], pageNumber:0,pageSize:10,totalCount:0},
  loading: false,
  filters: {
    pageNumber:1,
    pageSize:10
  },
  setFilter: (key, value) =>
    set((state) => ({
      filters: {
        ...state.filters,
        [key]: value,
      },
    })),

  clearFilters: () => set({ filters: {pageNumber:1,
    pageSize:10} }),

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